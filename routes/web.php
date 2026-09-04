<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

// Redirect root ke Login
Route::get('/', fn() => redirect()->route('login'))->name('welcome');

Route::middleware(['auth'])->group(function () {
    // 1. DASHBOARD UTAMA PT INDOJAR MULIA ABADI
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/home', fn() => redirect()->route('dashboard'))->name('home');

    // 2. MASTER PROYEK, TAHAPAN PROGRESS & FOTO BAPUK
    Route::prefix('project')->name('project.')->controller(ProjectController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/{id}', 'show')->name('show');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
        Route::post('/{id}/progress', 'storeProgress')->name('progress.store');
        Route::post('/{id}/photo', 'storePhoto')->name('photo.store');
        Route::delete('/photo/{photoId}', 'destroyPhoto')->name('photo.destroy');
    });

    // 3. LAPORAN REKAPITULASI PROYEK & SITE
    Route::prefix('laporan')->name('laporan.')->controller(LaporanController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/export', 'export')->name('export');
    });

    // 4. PROFIL PENGGUNA & ADMIN USER MANAGEMENT
    Route::prefix('profile')->name('profile.')->controller(ProfileController::class)->group(function () {
        Route::get('/', 'edit')->name('edit');
        Route::patch('/', 'update')->name('update');
        Route::delete('/', 'destroy')->name('destroy');
    });

    Route::prefix('admin/users')->name('admin.users.')->controller(UserController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::put('/{user}', 'update')->name('update');
        Route::delete('/{user}', 'destroy')->name('destroy');
        Route::post('/bulk-delete', 'bulkDelete')->name('bulk-delete');
    });
});

require __DIR__ . '/auth.php';