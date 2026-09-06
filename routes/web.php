<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\MasterDataController;
use App\Http\Controllers\PekerjaanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Halaman Profil Resmi Perusahaan (Landing Page)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
})->name('welcome');

Route::middleware(['auth'])->group(function () {
    // 2. Dashboard Utama PT Indojar Mulia Abadi
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/home', fn () => redirect()->route('dashboard'))->name('home');

    // 3. Master Proyek, Progress Lapangan & Dokumentasi
    Route::prefix('project')->name('project.')->controller(ProjectController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/export', 'export')->name('export');
        Route::post('/bulk-delete', 'bulkDelete')->name('bulk-delete');
        Route::post('/reset', 'reset')->name('reset');
        Route::get('/{id}', 'show')->name('show');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
        Route::post('/{id}/progress', 'storeProgress')->name('progress.store');
        Route::post('/{id}/photo', 'storePhoto')->name('photo.store');
        Route::delete('/photo/{photoId}', 'destroyPhoto')->name('photo.destroy');
    });

    // 4. Pengelolaan Pekerjaan WBS (Melekat pada Detail Site)
    Route::prefix('pekerjaan')->name('pekerjaan.')->controller(PekerjaanController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/export', 'export')->name('export');
        Route::post('/bulk-delete', 'bulkDelete')->name('bulk-delete');
        Route::post('/reset', 'reset')->name('reset');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });

  // 5. Master Data Kamus (Area, SOW, Tahapan, & Template WBS)
    // 5. Master Data Kamus (Area, SOW, & Tahapan Konstruksi)
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

    // 6. Laporan Rekapitulasi Proyek & Site
    Route::prefix('laporan')->name('laporan.')->controller(LaporanController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/export', 'export')->name('export');
    });

    // 7. Profil Pengguna
    Route::prefix('profile')->name('profile.')->controller(ProfileController::class)->group(function () {
        Route::get('/', 'edit')->name('edit');
        Route::patch('/', 'update')->name('update');
        Route::delete('/', 'destroy')->name('destroy');
    });

    // 8. Kelola Pengguna (Admin Panel)
    Route::prefix('admin/users')->name('admin.users.')->controller(UserController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::post('/bulk-delete', 'bulkDelete')->name('bulk-delete');
        Route::put('/{user}', 'update')->name('update');
        Route::delete('/{user}', 'destroy')->name('destroy');
    });
});

require __DIR__ . '/auth.php';