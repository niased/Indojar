<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InboundEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class InboundEmailController extends Controller
{
    /**
     * Menangani webhook email masuk dari Cloudflare Worker
     */
    public function store(Request $request)
    {
        // 1. Validasi Kunci Rahasia Pengaman (X-Webhook-Secret)
        $secretKey = $request->header('X-Webhook-Secret');
        $validSecret = 'SECRET_KEY_INDOJAR_123'; // Samakan dengan kunci di Cloudflare Worker kamu

        if ($secretKey !== $validSecret) {
            Log::warning('Akses Webhook Ditolak: Secret Key Tidak Cocok.');
            return response()->json([
                'status'  => 'error',
                'message' => 'Unauthorized access.',
            ], 401);
        }

        // 2. Validasi Input Data
        $validated = $request->validate([
            'from_email'  => 'required|email',
            'sender_name' => 'nullable|string',
            'to_email'    => 'required|email',
            'subject'     => 'nullable|string',
            'html_body'   => 'nullable|string',
            'text_body'   => 'nullable|string',
        ]);

        try {
            // 3. Simpan data email ke tabel inbound_emails
            $email = InboundEmail::create([
                'from_email'  => $validated['from_email'],
                'sender_name' => $validated['sender_name'] ?? $validated['from_email'],
                'to_email'    => $validated['to_email'],
                'subject'     => $validated['subject'] ?? '(Tanpa Subjek)',
                'html_body'   => $validated['html_body'] ?? $validated['text_body'],
                'text_body'   => $validated['text_body'],
                'is_read'     => false,
            ]);

            return response()->json([
                'status'  => 'success',
                'message' => 'Email berhasil disimpan.',
                'data_id' => $email->id,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Gagal Menyimpan Email Masuk: ' . $e->getMessage());

            return response()->json([
                'status'  => 'error',
                'message' => 'Gagal memproses email masuk.',
            ], 500);
        }
    }
}