<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Pengguna Internal PT Indojar Mulia Abadi
        $admin = User::create([
            'name'     => 'Admin Indojar',
            'email'    => 'admin@indojar.com',
            'password' => Hash::make('password123'),
            'role'     => 'admin',
        ]);

        $pm = User::create([
            'name'     => 'Project Manager / Waslap',
            'email'    => 'pm@indojar.com',
            'password' => Hash::make('password123'),
            'role'     => 'staff',
        ]);

        User::create([
            'name'     => 'Direksi Management',
            'email'    => 'direksi@indojar.com',
            'password' => Hash::make('password123'),
            'role'     => 'view',
        ]);
    }
}