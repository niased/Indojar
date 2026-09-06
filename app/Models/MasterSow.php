<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MasterSow extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'milestones' => 'array',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'sow_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(MasterTask::class, 'sow_id');
    }
}