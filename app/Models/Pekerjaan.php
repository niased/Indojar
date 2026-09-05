<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pekerjaan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'bobot'             => 'float',
        'progress_percent'  => 'float',
        'tanggal_pekerjaan' => 'date',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function stage(): BelongsTo
    {
        return $this->belongsTo(MasterStage::class, 'stage_id');
    }

    public function picUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}