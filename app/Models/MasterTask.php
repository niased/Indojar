<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MasterTask extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'default_bobot' => 'float',
    ];

    public function stage(): BelongsTo
    {
        return $this->belongsTo(MasterStage::class, 'stage_id');
    }

    public function sow(): BelongsTo
    {
        return $this->belongsTo(MasterSow::class, 'sow_id');
    }
}