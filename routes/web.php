<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\MasterDataController;
use App\Http\Controllers\PekerjaanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Halaman Profil Resmi Perusahaan (Landing Page)
Route::get('/', function () {
    return Inertia::render('Welcome/Welcome', [
        'canLogin' => Route::has('login'),
    ]);
})->name('welcome');

// 2. Halaman Tentang Kami
Route::get('/tentang-kami', function () {
    return Inertia::render('Welcome/About');
})->name('about');

// 3. Halaman Layanan
Route::get('/layanan', function () {
    return Inertia::render('Welcome/Services');
})->name('services');

// 4. Halaman Proyek
Route::get('/proyek', function () {
    return Inertia::render('Welcome/Projects');
})->name('projects');

// 5. Halaman Kontak
Route::get('/kontak', function () {
    return Inertia::render('Welcome/Contant');
})->name('contact');

Route::middleware(['auth'])->group(function () {
    // 6. Dashboard Utama PT Indojar Mulia Abadi
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/home', fn () => redirect()->route('dashboard'))->name('home');

    // 7. Master Proyek, Progress Lapangan & Dokumentasi
    Route::prefix('project')->name('project.')->controller(ProjectController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/export', 'export')->name('export');
        Route::post('/bulk-delete', 'bulkDelete')->name('bulk-delete');
        Route::post('/reset', 'reset')->name('reset');
        Route::get('/{id}', 'show')->name('show');
        Route::put('/{id}', 'update')->name('update');
        Route::put('/{id}/stages', 'updateStages')->name('stages.update'); // Kelola tahapan & bobot proyek
        Route::delete('/{id}', 'destroy')->name('destroy');
    });

    // 8. Pengelolaan Pekerjaan WBS (Melekat pada Detail Site)
    Route::prefix('pekerjaan')->name('pekerjaan.')->controller(PekerjaanController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/export', 'export')->name('export');
        Route::post('/bulk-delete', 'bulkDelete')->name('bulk-delete');
        Route::post('/reset', 'reset')->name('reset');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });

    // 9. Master Data Kamus (Area, SOW, & Tahapan Konstruksi)
    Route::prefix('master-data')->name('master-data.')->controller(MasterDataController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        
        // Area
        Route::post('/area', 'storeArea')->name('area.store');
        Route::post('/area/bulk-delete', 'bulkDeleteArea')->name('area.bulk-delete');
        Route::delete('/area/{id}', 'destroyArea')->name('area.destroy');
        
        // SOW
        Route::post('/sow', 'storeSow')->name('sow.store');
        Route::put('/sow/{id}', 'updateSow')->name('sow.update');
        Route::post('/sow/bulk-delete', 'bulkDeleteSow')->name('sow.bulk-delete');
        Route::delete('/sow/{id}', 'destroySow')->name('sow.destroy');
        
        // Tahapan (Stage)
        Route::post('/stage', 'storeStage')->name('stage.store');
        Route::put('/stage/{id}', 'updateStage')->name('stage.update');
        Route::post('/stage/bulk-delete', 'bulkDeleteStage')->name('stage.bulk-delete');
        Route::delete('/stage/{id}', 'destroyStage')->name('stage.destroy');
    });

    // 10. Laporan Rekapitulasi Proyek & Site
    Route::prefix('laporan')->name('laporan.')->controller(LaporanController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/export', 'export')->name('export');
    });

    // 11. Profil Pengguna
    Route::prefix('profile')->name('profile.')->controller(ProfileController::class)->group(function () {
        Route::get('/', 'edit')->name('edit');
        Route::patch('/', 'update')->name('update');
        Route::delete('/', 'destroy')->name('destroy');
    });

    // 12. Kelola Pengguna (Admin Panel)
    Route::prefix('admin/users')->name('admin.users.')->controller(UserController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::post('/bulk-delete', 'bulkDelete')->name('bulk-delete');
        Route::put('/{user}', 'update')->name('update');
        Route::delete('/{user}', 'destroy')->name('destroy');
    });

    // 13. Kelola Email (Resend API Integration)
    Route::prefix('emails')->name('emails.')->controller(EmailController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/inbox', 'inbox')->name('inbox');
        Route::post('/send', 'send')->name('send');
        Route::patch('/inbound/{id}/read', 'markAsRead')->name('inbound.read');
        Route::delete('/inbound/{id}', 'destroyInbound')->name('inbound.destroy');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });
});

require __DIR__ . '/auth.php';