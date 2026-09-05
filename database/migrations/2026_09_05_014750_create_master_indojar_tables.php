<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Master Area / Regional
        Schema::create('master_areas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_area', 50); // Contoh: AREA 1, AREA 2
            $table->string('regional', 100); // Contoh: Jabodetabek, Jawa Barat, Banten
            $table->timestamps();
        });

        // 2. Master SOW (Scope of Work)
        Schema::create('master_sows', function (Blueprint $table) {
            $table->id();
            $table->string('nama_sow', 50)->unique(); // Contoh: B2S, COLO, CME ONLY, STRENGTHENING
            $table->string('keterangan')->nullable();
            $table->timestamps();
        });

        // 3. Master Tahapan Standar (Milestone Tower)
        Schema::create('master_stages', function (Blueprint $table) {
            $table->id();
            $table->string('kode_stage', 30)->unique(); // SITAC, CIVIL, ERECTION, CME, POWER, RFI, ATP, BAST
            $table->string('nama_stage', 100);          // Label tampilan
            $table->integer('urutan')->default(1);
            $table->timestamps();
        });

        // 4. Master Template Task (Katalog WBS Acuan)
        Schema::create('master_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stage_id')->constrained('master_stages')->cascadeOnDelete();
            $table->foreignId('sow_id')->nullable()->constrained('master_sows')->nullOnDelete();
            $table->string('nama_task', 255);          // Uraian kerja standar
            $table->string('satuan', 30)->default('Lot');
            $table->decimal('default_bobot', 5, 2)->default(0.00);
            $table->integer('urutan')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('master_tasks');
        Schema::dropIfExists('master_stages');
        Schema::dropIfExists('master_sows');
        Schema::dropIfExists('master_areas');
    }
};