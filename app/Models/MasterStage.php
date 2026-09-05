<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MasterStage extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function tasks(): HasMany
    {
        return $this->hasMany(MasterTask::class, 'stage_id')->orderBy('urutan', 'asc');
    }

    public function pekerjaans(): HasMany
    {
        return $this->hasMany(Pekerjaan::class, 'stage_id');
    }
}