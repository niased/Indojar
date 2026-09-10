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
        // 1. Validasi Kunci Rahasia Pengaman
        $secretKey = $request->header('X-Webhook-Secret') 
                  ?? $request->header('x-webhook-secret') 
                  ?? $request->input('secret_key');

        $secretKey = trim((string) $secretKey);
        $validSecret = 'SECRET_KEY_INDOJAR_123';

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

        // 3. Bersihkan nama pengirim & subjek dari karakter tanda petik ganda "
        $senderName = $validated['sender_name'] ?? $validated['from_email'];
        $senderName = trim(str_replace('"', '', $senderName));

        $subject = $validated['subject'] ?? '(Tanpa Subjek)';
        $subject = trim(str_replace('"', '', $subject));

        // 4. Bersihkan isi email mentah (Raw MIME) menggunakan PHP Parser
        $rawContent = $validated['html_body'] ?? $validated['text_body'] ?? '';
        $cleanBody  = $this->parseRawMimeBody($rawContent);

        try {
            // 5. Simpan data email bersih ke tabel inbound_emails
            $email = InboundEmail::create([
                'from_email'  => $validated['from_email'],
                'sender_name' => $senderName ?: $validated['from_email'],
                'to_email'    => $validated['to_email'],
                'subject'     => $subject,
                'html_body'   => $cleanBody['html'],
                'text_body'   => $cleanBody['text'],
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

    /**
     * Memotong header MIME, memisah bagian HTML/Text, dan mendecode Quoted-Printable.
     */
    private function parseRawMimeBody(?string $raw): array
    {
        if (empty($raw)) {
            return ['text' => '', 'html' => ''];
        }

        if (!str_contains($raw, 'Received:') && !str_contains($raw, 'Content-Type:')) {
            return ['text' => trim($raw), 'html' => trim($raw)];
        }

        $textBody = '';
        $htmlBody = '';

        if (preg_match('/boundary="?([^"\r\n]+)"?/i', $raw, $matches)) {
            $boundary = $matches[1];
            $parts = explode('--' . $boundary, $raw);

            foreach ($parts as $part) {
                if (str_contains($part, 'text/plain')) {
                    $extracted = $this->extractPartBody($part);
                    if ($extracted) $textBody = $extracted;
                }
                if (str_contains($part, 'text/html')) {
                    $extracted = $this->extractPartBody($part);
                    if ($extracted) $htmlBody = $extracted;
                }
            }
        } else {
            $splits = preg_split('/\r?\n\r?\n/', $raw, 2);
            $textBody = $splits[1] ?? $raw;
        }

        $textBody = trim($textBody);
        $htmlBody = trim($htmlBody);

        return [
            'text' => $textBody ?: $raw,
            'html' => $htmlBody ?: ($textBody ?: $raw),
        ];
    }

    private function extractPartBody(string $part): string
    {
        $splits = preg_split('/\r?\n\r?\n/', $part, 2);
        if (count($splits) < 2) {
            return '';
        }

        $header = $splits[0];
        $body   = $splits[1];

        $body = preg_replace('/--\s*$/', '', $body);

        if (stripos($header, 'Content-Transfer-Encoding: quoted-printable') !== false) {
            $body = quoted_printable_decode($body);
        } elseif (stripos($header, 'Content-Transfer-Encoding: base64') !== false) {
            $body = base64_decode($body);
        }

        return trim($body);
    }
}