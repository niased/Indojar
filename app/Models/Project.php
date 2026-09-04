<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'spk_date'         => 'date',
        'target_rfi_date'  => 'date',
        'progress_percent' => 'float',
    ];

    public function picUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pic_user_id');
    }

    public function progresses(): HasMany
    {
        return $this->hasMany(ProjectProgress::class)->orderBy('tanggal_pekerjaan', 'desc');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(ProjectPhoto::class)->orderBy('created_at', 'desc');
    }
}