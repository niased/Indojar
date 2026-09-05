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
            $table->string('nama_pekerjaan', 255);              // Uraian item kerja
            $table->string('satuan', 30)->default('Lot');
            $table->decimal('bobot', 5, 2)->default(0.00);      // Bobot item (%)
            $table->decimal('progress_percent', 5, 2)->default(0.00); // Realisasi lapangan (0 - 100%)
            $table->string('status', 30)->default('PLANNING');  // PLANNING, IN_PROGRESS, COMPLETED

            $table->date('tanggal_pekerjaan')->nullable();      // Tanggal cek lapangan
            $table->string('foto', 500)->nullable();            // Secure URL Cloudinary
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