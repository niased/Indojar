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
        'tgl_po'           => 'date',
        'spk_date'         => 'date',
        'target_rfi_date'  => 'date',
        'tgl_mos'          => 'date',
        'tgl_start'        => 'date',
        'tgl_done'         => 'date',
        'tgl_atp'          => 'date',
        'tgl_bast'         => 'date',
        'tgl_baut'         => 'date',
        'tgl_invoice'      => 'date',
        'latitude'         => 'float',
        'longitude'        => 'float',
        'progress_percent' => 'float',
    ];

    public function area(): BelongsTo
    {
        return $this->belongsTo(MasterArea::class, 'area_id');
    }

    public function sow(): BelongsTo
    {
        return $this->belongsTo(MasterSow::class, 'sow_id');
    }

    public function picUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pic_user_id');
    }

    public function pekerjaans(): HasMany
    {
        return $this->hasMany(Pekerjaan::class, 'project_id');
    }

    public function issues(): HasMany
    {
        return $this->hasMany(ProjectIssue::class, 'project_id');
    }
}