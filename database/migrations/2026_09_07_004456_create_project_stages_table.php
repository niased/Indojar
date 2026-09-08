<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_stages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignId('stage_id')->constrained('master_stages')->cascadeOnDelete();
            $table->decimal('bobot', 5, 2)->default(0.00);          // Bobot tahapan ini terhadap total menara (misal: 30.00)
            $table->decimal('progress_percent', 5, 2)->default(0.00); // Diupdate admin (0 - 100%)
            $table->string('status', 30)->default('PLANNING');      // PLANNING, IN_PROGRESS, COMPLETED
            $table->timestamps();
            
            $table->unique(['project_id', 'stage_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_stages');
    }
};