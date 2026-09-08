<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pekerjaans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignId('stage_id')->nullable()->constrained('master_stages')->nullOnDelete();

            $table->string('kode_pekerjaan', 50);               // Contoh: PND-01, ERC-02
            $table->string('kategori_tahap', 50)->nullable();   // SITAC, CIVIL, ERECTION, CME, POWER, ATP
            $table->string('nama_pekerjaan', 255);              // Uraian laporan / aktivitas fisik
            $table->string('satuan', 30)->default('Lot');

            $table->dateTime('tanggal_pekerjaan')->nullable();  // Tanggal & waktu cek lapangan
            $table->string('foto', 500)->nullable();            // Secure URL Cloudinary
            $table->string('tipe_foto', 30)->default('DOKUMENTASI'); // DOKUMENTASI, ISSUE
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete(); // Akun PIC yang input/update
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->index(['project_id', 'stage_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pekerjaans');
    }
};