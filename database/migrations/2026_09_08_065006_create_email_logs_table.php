<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('email_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); // Pengirim (user web)
            $table->string('recipient');   // Email tujuan
            $table->string('subject');     // Subjek email
            $table->text('body');          // Isi pesan
            $table->string('status');      // 'sent' atau 'failed'
            $table->string('resend_id')->nullable(); // ID unik dari Resend API
            $table->text('error_message')->nullable(); // Catatan jika gagal kirim
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('email_logs');
    }
};