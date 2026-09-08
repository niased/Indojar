<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'recipient',
        'subject',
        'body',
        'status',
        'resend_id',
        'error_message',
    ];

    // Relasi ke User yang mengirim email
    public function user()
    {
        return $table = $this->belongsTo(User::class);
    }
}