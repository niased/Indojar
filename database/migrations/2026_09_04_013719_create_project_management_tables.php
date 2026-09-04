<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. MASTER DATA PROYEK / SITE TOWER PT INDOJAR MULIA ABADI
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_code')->unique();       // Contoh: PRJ-IMA-2026-001
            $table->string('pid')->nullable()->index();     // Project ID / WBS (Contoh: 24TS01B0531)
            $table->string('site_id')->index();             // Site ID (Contoh: SRG117, BGR021)
            $table->string('site_name');                    // Contoh: LANUDGORDA
            $table->string('client_name')->default('Telkomsel / Mitratel');
            $table->string('kontraktor')->default('PT. INDOJAR MULIA ABADI');
            $table->string('konsultan')->nullable();        // Contoh: PT. ATRYA REKAYASA
            $table->string('tipe_tower')->default('SST 4 LEGS'); // SST 52, Monopole, Guyed
            $table->string('tinggi_tower')->default('52M'); // 52M, 42M, 32M
            $table->string('wilayah')->nullable();          // Serang, Bogor, Lebak, dll.
            $table->text('alamat_site')->nullable();
            $table->string('lat_long')->nullable();         // Koordinat Peta Dashboard (-6.1234, 106.5678)
            $table->date('spk_date')->nullable();
            $table->date('target_rfi_date')->nullable();
            $table->enum('status', [
                'PLANNING', 
                'PONDASI', 
                'ERECTION', 
                'CME', 
                'RFI', 
                'ATP', 
                'COMPLETED'
            ])->default('PLANNING')->index();
            $table->decimal('progress_percent', 5, 2)->default(0.00);
            $table->foreignId('pic_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('catatan_proyek')->nullable();
            $table->timestamps();
        });

        // 2. LOG TAHAPAN PROGRESS PEKERJAAN
        Schema::create('project_progresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('tahap', ['PONDASI', 'ERECTION', 'CME', 'RFI', 'ATP']);
            $table->string('item_pekerjaan');               // Misal: Pembesian Pad & Pedestal, Erection Section 1
            $table->date('tanggal_pekerjaan');
            $table->decimal('bobot_persen', 5, 2)->default(0);
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });

        // 3. FOTO DOKUMENTASI TEKNIS LAPANGAN (STANDAR BAPUK)
        Schema::create('project_photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignId('progress_id')->nullable()->constrained('project_progresses')->nullOnDelete();
            $table->enum('kategori', [
                'PONDASI', 
                'SLUMP_TEST', 
                'ERECTION', 
                'VERTICALITY', 
                'GROUNDING', 
                'ELECTRICAL', 
                'PAGAR_HALAMAN', 
                'ATP_100'
            ])->default('PONDASI');
            $table->string('judul_foto');                   // Contoh: Pengukuran Besi Pad 7.5M, Grounding 0.03 Ohm
            $table->string('file_path');
            $table->string('hasil_ukur')->nullable();       // Contoh: 1.60 M, 0.03 Ohm, 392 Volt
            $table->date('tanggal_foto');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_photos');
        Schema::dropIfExists('project_progresses');
        Schema::dropIfExists('projects');
    }
};