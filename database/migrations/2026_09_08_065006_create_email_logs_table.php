<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'email_db';
    public $withinTransaction = false;

    public function up(): void
    {
        // Bersihkan tabel lama di CockroachDB jika sudah terlanjur ada
        Schema::connection('email_db')->dropIfExists('inbound_emails');
        Schema::connection('email_db')->dropIfExists('email_logs');

        // 1. Tabel Email Keluar
        Schema::connection('email_db')->create('email_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); 
            $table->string('sender')->nullable();
            $table->string('recipient');
            $table->string('subject');
            $table->text('body');
            $table->string('status');
            $table->string('resend_id')->nullable();
            $table->text('error_message')->nullable();
            $table->timestamps();
        });

        // 2. Tabel Email Masuk
        Schema::connection('email_db')->create('inbound_emails', function (Blueprint $table) {
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
        Schema::connection('email_db')->dropIfExists('inbound_emails');
        Schema::connection('email_db')->dropIfExists('email_logs');
    }
};