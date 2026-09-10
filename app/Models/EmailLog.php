<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    use HasFactory;

    /**
     * Nama koneksi database khusus email (CockroachDB)
     */
    protected $connection = 'email_db';

    protected $fillable = [
        'user_id',
        'sender',
        'recipient',
        'subject',
        'body',
        'status',
        'resend_id',
        'error_message',
    ];

    /**
     * Konversi tipe data otomatis (casting)
     */
    protected $casts = [
        'id' => 'string', // Mencegah kerusakan angka BigInt CockroachDB di JavaScript/Inertia
    ];

    // Relasi ke User yang mengirim email
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}