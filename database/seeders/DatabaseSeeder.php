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

        // 2. Data Master Proyek Awal PT Indojar Mulia Abadi
        Project::create([
            'project_code'     => 'PRJ-IMA-2026-001',
            'pid'              => '24TS01B0531',
            'site_id'          => 'SRG117',
            'site_name'        => 'LANUDGORDA',
            'client_name'      => 'Telkomsel / Mitratel',
            'kontraktor'       => 'PT. INDOJAR MULIA ABADI',
            'konsultan'        => 'PT. ATRYA REKAYASA',
            'tipe_tower'       => 'SST 4 LEGS',
            'tinggi_tower'     => '52M',
            'wilayah'          => 'Serang',
            'alamat_site'      => 'Kec. Binuang, Kab. Serang, Banten',
            'lat_long'         => '-6.0712, 106.3541',
            'spk_date'         => '2026-01-10',
            'target_rfi_date'  => '2026-03-30',
            'status'           => 'ERECTION',
            'progress_percent' => 65.50,
            'pic_user_id'      => $pm->id,
            'catatan_proyek'   => 'Pondasi selesai 100%, lanjut erection tower leg 1-3.',
        ]);

        Project::create([
            'project_code'     => 'PRJ-IMA-2026-002',
            'pid'              => '24TS01B0540',
            'site_id'          => 'BGR021',
            'site_name'        => 'CIPARIGI',
            'client_name'      => 'Telkomsel / Mitratel',
            'kontraktor'       => 'PT. INDOJAR MULIA ABADI',
            'konsultan'        => 'PT. ATRYA REKAYASA',
            'tipe_tower'       => 'SST 4 LEGS',
            'tinggi_tower'     => '42M',
            'wilayah'          => 'Bogor',
            'alamat_site'      => 'Ciparigi, Kota Bogor, Jawa Barat',
            'lat_long'         => '-6.5515, 106.8140',
            'spk_date'         => '2026-02-01',
            'target_rfi_date'  => '2026-04-15',
            'status'           => 'PONDASI',
            'progress_percent' => 30.00,
            'pic_user_id'      => $pm->id,
            'catatan_proyek'   => 'Pembesian pad & pedestal selesai, persiapan pengecoran.',
        ]);
    }
}