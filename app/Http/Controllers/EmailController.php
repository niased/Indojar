<?php

namespace App\Http\Controllers;

use App\Models\EmailLog;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Resend\Laravel\Facades\Resend;

class EmailController extends Controller
{
    /**
     * Tampilkan halaman kirim email & riwayat pengiriman.
     */
    public function index(Request $request)
    {
        $emailLogs = EmailLog::with('user:id,name,email')
            ->when($request->search, function ($query, $search) {
                $query->where('recipient', 'like', "%{$search}%")
                      ->orWhere('subject', 'like', "%{$search}%");
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

            // 1. Eksekusi Pengiriman via Resend API dengan pengirim dinamis
            $response = Resend::emails()->send([
                'from'    => "{$fromName} <{$request->sender}>",
                'to'      => [$request->recipient],
                'subject' => $request->subject,
                'html'    => nl2br(e($request->body)),
            ]);

            // Ambil ID dari response Resend secara aman
            $resendId = data_get($response, 'id');

            // 2. Simpan Riwayat Berhasil (Status: sent)
            EmailLog::create([
                'user_id'   => Auth::id(),
                'recipient' => $request->recipient,
                'subject'   => $request->subject,
                'body'      => $request->body,
                'status'    => 'sent',
                'resend_id' => $resendId,
            ]);

            return back()->with('success', 'Email berhasil dikirim ke ' . $request->recipient);

        } catch (Exception $e) {
            // 3. Simpan Riwayat Gagal (Status: failed)
            EmailLog::create([
                'user_id'       => Auth::id(),
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
     * Hapus catatan riwayat email.
     *
     * @param int|string $id
     */
    public function destroy(int|string $id)
    {
        $log = EmailLog::findOrFail($id);
        $log->delete();

        return back()->with('success', 'Riwayat email berhasil dihapus.');
    }
}