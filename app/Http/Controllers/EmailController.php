<?php

namespace App\Http\Controllers;

use App\Models\EmailLog;
use App\Models\InboundEmail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            ->paginate(10)
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
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Email/Inbox', [
            'inboundEmails' => $inboundEmails,
            'filters'       => $request->only(['search']),
        ]);
    }

    /**
     * Tampilkan detail email masuk dan otomatis tandai sebagai sudah dibaca (Read).
     */
    public function showInbound(int|string $id)
    {
        $email = InboundEmail::findOrFail($id);

        // Otomatis ubah status is_read menjadi true jika belum dibaca
        if (!$email->is_read) {
            $email->update(['is_read' => true]);
        }

        return Inertia::render('Email/ShowInbound', [
            'email' => $email,
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

        try {
            $fromName = config('mail.from.name', 'PT Indojar Mulia Abadi');

            // 1. Eksekusi Pengiriman via Resend API
            $response = Resend::emails()->send([
                'from'    => "{$fromName} <{$request->sender}>",
                'to'      => [$request->recipient],
                'subject' => $request->subject,
                'html'    => nl2br(e($request->body)),
            ]);

            // Ambil ID dari response Resend
            $resendId = data_get($response, 'id');

            // 2. Simpan Riwayat Berhasil ke CockroachDB (Status: sent)
            EmailLog::create([
                'user_id'   => Auth::id(),
                'sender'    => $request->sender,
                'recipient' => $request->recipient,
                'subject'   => $request->subject,
                'body'      => $request->body,
                'status'    => 'sent',
                'resend_id' => $resendId,
            ]);

            return back()->with('success', 'Email berhasil dikirim ke ' . $request->recipient);

        } catch (Exception $e) {
            // 3. Simpan Riwayat Gagal ke CockroachDB (Status: failed)
            EmailLog::create([
                'user_id'       => Auth::id(),
                'sender'        => $request->sender,
                'recipient'     => $request->recipient,
                'subject'       => $request->subject,
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
    public function markAsRead(int|string $id)
    {
        $email = InboundEmail::findOrFail($id);
        $email->update(['is_read' => true]);

        return back();
    }

    /**
     * Hapus catatan riwayat email terkirim.
     */
    public function destroy(int|string $id)
    {
        $log = EmailLog::findOrFail($id);
        $log->delete();

        return back()->with('success', 'Riwayat email berhasil dihapus.');
    }

    /**
     * Hapus email masuk dari kotak masuk.
     */
    public function destroyInbound(int|string $id)
    {
        $email = InboundEmail::findOrFail($id);
        $email->delete();

        return back()->with('success', 'Email masuk berhasil dihapus.');
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
            $senderName = data_get($data, 'headers.from_name') ?? $fromEmail;
            
            $toEmail = data_get($data, 'to');
            if (is_array($toEmail)) {
                $toEmail = $toEmail[0] ?? 'admin@indojar.com';
            }

            // Simpan otomatis ke tabel inbound_emails di CockroachDB
            InboundEmail::create([
                'from_email'  => $fromEmail,
                'sender_name' => $senderName,
                'to_email'    => $toEmail,
                'subject'     => data_get($data, 'subject', '(Tanpa Subjek)'),
                'html_body'   => data_get($data, 'html'),
                'text_body'   => data_get($data, 'text'),
                'is_read'     => false,
            ]);
        }

        return response()->json(['status' => 'success'], 200);
    }
}