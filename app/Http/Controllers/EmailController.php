<?php

namespace App\Http\Controllers;

use App\Models\EmailLog;
use App\Models\InboundEmail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Resend\Laravel\Facades\Resend;

class EmailController extends Controller
{
    /**
     * Tampilkan halaman riwayat email terkirim (Outbox/Logs).
     */
    public function index(Request $request)
    {
        $emailLogs = EmailLog::with('user:id,name,email')
            ->when($request->search, function ($query, $search) {
                $query->where('recipient', 'like', "%{$search}%")
                      ->orWhere('subject', 'like', "%{$search}%")
                      ->orWhere('sender', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Email/Index', [
            'emailLogs' => $emailLogs,
            'filters'   => $request->only(['search']),
        ]);
    }

    /**
     * Tampilkan halaman kotak masuk email (Inbox).
     */
    public function inbox(Request $request)
    {
        $inboundEmails = InboundEmail::query()
            ->when($request->search, function ($query, $search) {
                $query->where('from_email', 'like', "%{$search}%")
                      ->orWhere('sender_name', 'like', "%{$search}%")
                      ->orWhere('subject', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(30)
            ->withQueryString();

        return Inertia::render('Email/Inbox', [
            'inboundEmails' => $inboundEmails,
            'filters'       => $request->only(['search']),
        ]);
    }

    /**
     * Kirim email menggunakan Resend API dan simpan log ke database.
     */
    public function send(Request $request)
    {
        $request->validate([
            'sender'    => 'required|email|max:255',
            'recipient' => 'required|email|max:255',
            'subject'   => 'required|string|max:255',
            'body'      => 'required|string',
        ]);

        $cleanSubject = trim(str_replace('"', '', $request->subject));

        try {
            $fromName = config('mail.from.name', 'PT Indojar Mulia Abadi');

            // 1. Eksekusi Pengiriman via Resend API
            $response = Resend::emails()->send([
                'from'    => "{$fromName} <{$request->sender}>",
                'to'      => [$request->recipient],
                'subject' => $cleanSubject,
                'html'    => nl2br(e($request->body)),
            ]);

            $resendId = data_get($response, 'id');

            // 2. Simpan Riwayat Berhasil (Status: sent)
            EmailLog::create([
                'user_id'   => Auth::id(),
                'sender'    => $request->sender,
                'recipient' => $request->recipient,
                'subject'   => $cleanSubject,
                'body'      => $request->body,
                'status'    => 'sent',
                'resend_id' => $resendId,
            ]);

            return back()->with('success', 'Email berhasil dikirim ke ' . $request->recipient);

        } catch (Exception $e) {
            Log::error('Gagal Mengirim Email Outbox: ' . $e->getMessage());

            // 3. Simpan Riwayat Gagal (Status: failed)
            EmailLog::create([
                'user_id'       => Auth::id(),
                'sender'        => $request->sender,
                'recipient'     => $request->recipient,
                'subject'       => $cleanSubject,
                'body'          => $request->body,
                'status'        => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            return back()->with('error', 'Gagal mengirim email: ' . $e->getMessage());
        }
    }

    /**
     * Tandai email masuk sebagai sudah dibaca (Read).
     */
    public function markAsRead($id)
    {
        try {
            $email = InboundEmail::find($id);
            
            if ($email && !$email->is_read) {
                $email->update(['is_read' => true]);
            }
        } catch (Exception $e) {
            Log::error('Gagal memperbarui status read email: ' . $e->getMessage());
        }

        return back();
    }

    /**
     * Toggle status favorit (is_starred) email masuk.
     */
    public function toggleFavorite($id)
    {
        try {
            $email = InboundEmail::findOrFail($id);
            $email->update(['is_starred' => !$email->is_starred]);

            return back()->with('success', 'Status favorit berhasil diperbarui.');
        } catch (Exception $e) {
            Log::error('Gagal memperbarui favorit: ' . $e->getMessage());
            return back()->with('error', 'Gagal memperbarui status favorit.');
        }
    }

    /**
     * Blokir pengirim dan hapus semua email dari pengirim tersebut.
     */
    public function blockSender(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        try {
            InboundEmail::where('from_email', $request->email)->delete();

            return back()->with('success', "Semua email dari {$request->email} berhasil diblokir dan dihapus.");
        } catch (Exception $e) {
            Log::error('Gagal memblokir pengirim: ' . $e->getMessage());
            return back()->with('error', 'Gagal memblokir pengirim.');
        }
    }

    /**
     * Hapus catatan riwayat email terkirim (Outbox).
     */
    public function destroy(int|string $id)
    {
        try {
            $log = EmailLog::findOrFail($id);
            $log->delete();

            return back()->with('success', 'Riwayat email berhasil dihapus.');
        } catch (Exception $e) {
            Log::error('Gagal menghapus log email outbox: ' . $e->getMessage());
            return back()->with('error', 'Gagal menghapus riwayat email.');
        }
    }

    /**
     * Hapus email masuk dari kotak masuk (Inbox).
     */
    public function destroyInbound(int|string $id)
    {
        try {
            $email = InboundEmail::findOrFail($id);
            $email->delete();

            return back()->with('success', 'Email masuk berhasil dihapus.');
        } catch (Exception $e) {
            Log::error('Gagal menghapus email masuk: ' . $e->getMessage());
            return back()->with('error', 'Gagal menghapus email masuk.');
        }
    }

    /**
     * Menangkap Webhook dari Resend ketika ada email masuk (Inbound Email).
     */
    public function handleInboundWebhook(Request $request)
    {
        $eventType = $request->input('type');

        if ($eventType === 'email.received') {
            $data = $request->input('data', []);

            $fromEmail  = data_get($data, 'from');
            $rawSender  = data_get($data, 'headers.from_name') ?? $fromEmail;
            
            $senderName = trim(str_replace('"', '', $rawSender));
            $subject    = trim(str_replace('"', '', data_get($data, 'subject', '(Tanpa Subjek)')));

            $toEmail = data_get($data, 'to');
            if (is_array($toEmail)) {
                $toEmail = $toEmail[0] ?? 'admin@indojar.com';
            }

            InboundEmail::create([
                'from_email'  => $fromEmail,
                'sender_name' => $senderName ?: $fromEmail,
                'to_email'    => $toEmail,
                'subject'     => $subject,
                'html_body'   => data_get($data, 'html'),
                'text_body'   => data_get($data, 'text'),
                'is_read'     => false,
            ]);
        }

        return response()->json(['status' => 'success'], 200);
    }
}