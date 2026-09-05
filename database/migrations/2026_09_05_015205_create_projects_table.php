<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_code')->unique();            // Kode Sistem: PRJ-IMA-2026-001
            $table->string('pid')->nullable()->index();          // Project ID Klien (misal: 21SF10C0013)
            $table->string('site_id')->index();                  // Site ID (misal: SRG117, BGR021)
            $table->string('site_name');                         // Nama Site (misal: JAMARAS_KIDULMG)
            $table->string('site_id_dmt', 100)->nullable();      // Site ID DMT
            $table->string('site_id_tenant', 100)->nullable();   // Site ID Tenant

            // Relasi ke Master Data Kamus
            $table->foreignId('area_id')->nullable()->constrained('master_areas')->nullOnDelete();
            $table->foreignId('sow_id')->nullable()->constrained('master_sows')->nullOnDelete();

            // Kontrak & Legalitas
            $table->string('client_name')->default('Telkomsel / Mitratel');
            $table->string('kontraktor')->default('PT. INDOJAR MULIA ABADI');
            $table->string('konsultan')->nullable();
            $table->string('no_po', 100)->nullable();
            $table->date('tgl_po')->nullable();
            $table->date('spk_date')->nullable();
            $table->string('kompensasi')->nullable();

            // Spesifikasi Tower & Lokasi
            $table->string('tipe_tower')->default('SST 4 LEGS');
            $table->string('tinggi_tower')->default('52M');
            $table->text('alamat_site')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();

            // Milestone Tanggal Proyek (Siklus Excel Indojar)
            $table->date('tgl_mos')->nullable();
            $table->date('tgl_start')->nullable();
            $table->date('tgl_done')->nullable();
            $table->date('target_rfi_date')->nullable();
            $table->date('tgl_atp')->nullable();
            $table->date('tgl_bast')->nullable();
            $table->date('tgl_baut')->nullable();
            $table->date('tgl_invoice')->nullable();

            // Status, Progress, & Akun PIC
            $table->string('status', 50)->default('PLANNING')->index(); // PLANNING, ON_PROGRESS, ISSUE, COMPLETED
            $table->string('proses_status', 50)->nullable();            // Status proses: jaguar, dsb.
            $table->decimal('progress_percent', 5, 2)->default(0.00);  // Akumulasi tertimbang otomatis dari item WBS
            $table->foreignId('pic_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('catatan_proyek')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};