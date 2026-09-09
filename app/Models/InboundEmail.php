<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InboundEmail extends Model
{
    use HasFactory;

    /**
     * Nama koneksi database khusus email (CockroachDB)
     */
    protected $connection = 'email_db';

    /**
     * Nama tabel di database
     */
    protected $table = 'inbound_emails';

    /**
     * Kolom yang dapat diisi secara massal (mass assignable)
     */
    protected $fillable = [
        'from_email',
        'sender_name',
        'to_email',
        'subject',
        'html_body',
        'text_body',
        'is_read',
    ];

    /**
     * Konversi tipe data otomatis (casting)
     */
    protected $casts = [
        'id'      => 'string', // Mencegah kerusakan angka 19 digit (BigInt) di JavaScript/Inertia
        'is_read' => 'boolean',
    ];
}