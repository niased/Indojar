<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Tabel Riwayat Email Keluar (Outbound / Sent)
        Schema::create('email_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); // Operator user web
            $table->string('sender')->nullable();   // Email pengirim resmi (misal: project@indojar.com)
            $table->string('recipient');            // Email tujuan
            $table->string('subject');              // Subjek email
            $table->text('body');                   // Isi pesan
            $table->string('status');               // 'sent' atau 'failed'
            $table->string('resend_id')->nullable(); // ID unik dari Resend API
            $table->text('error_message')->nullable(); // Catatan jika gagal kirim
            $table->timestamps();
        });

        // 2. Tabel Kotak Masuk Email (Inbound / Inbox)
        Schema::create('inbound_emails', function (Blueprint $table) {
            $table->id();
            $table->string('from_email');
            $table->string('sender_name')->nullable();
            $table->string('to_email');
            $table->string('subject');
            $table->longText('html_body')->nullable();
            $table->longText('text_body')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inbound_emails');
        Schema::dropIfExists('email_logs');
    }
};