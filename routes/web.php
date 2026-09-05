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

// 1. HALAMAN PROFIL RESMI PERUSAHAAN (LANDING PAGE)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
})->name('welcome');

Route::middleware(['auth'])->group(function () {
    // 2. DASHBOARD UTAMA PT INDOJAR MULIA ABADI
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/home', fn() => redirect()->route('dashboard'))->name('home');

    // 3. MASTER PROYEK, PROGRESS LAPANGAN & DOKUMENTASI
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

    // 4. MASTER PEKERJAAN (WBS & BOQ LAPANGAN)
    Route::prefix('pekerjaan')->name('pekerjaan.')->controller(PekerjaanController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/export', 'export')->name('export');
        Route::post('/bulk-delete', 'bulkDelete')->name('bulk-delete');
        Route::post('/reset', 'reset')->name('reset');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });

    // 5. MASTER DATA KAMUS (AREA, SOW, TAHAPAN, & TEMPLATE WBS)
    Route::prefix('master-data')->name('master-data.')->controller(MasterDataController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/area', 'storeArea')->name('area.store');
        Route::delete('/area/{id}', 'destroyArea')->name('area.destroy');
        Route::post('/sow', 'storeSow')->name('sow.store');
        Route::delete('/sow/{id}', 'destroySow')->name('sow.destroy');
        Route::post('/stage', 'storeStage')->name('stage.store');
        Route::delete('/stage/{id}', 'destroyStage')->name('stage.destroy');
        Route::post('/task', 'storeTask')->name('task.store');
        Route::delete('/task/{id}', 'destroyTask')->name('task.destroy');
    });

    // 6. LAPORAN REKAPITULASI PROYEK & SITE
    Route::prefix('laporan')->name('laporan.')->controller(LaporanController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/export', 'export')->name('export');
    });

    // 7. PROFIL PENGGUNA
    Route::prefix('profile')->name('profile.')->controller(ProfileController::class)->group(function () {
        Route::get('/', 'edit')->name('edit');
        Route::patch('/', 'update')->name('update');
        Route::delete('/', 'destroy')->name('destroy');
    });

    // 8. KELOLA PENGGUNA (ADMIN PANEL)
    Route::prefix('admin/users')->name('admin.users.')->controller(UserController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::post('/bulk-delete', 'bulkDelete')->name('bulk-delete');
        Route::put('/{user}', 'update')->name('update');
        Route::delete('/{user}', 'destroy')->name('destroy');
    });
});

require __DIR__ . '/auth.php';