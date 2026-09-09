<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\Api\InboundEmailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// 1. Endpoint Webhook Email Masuk langsung dari Resend
Route::post('/webhooks/resend/inbound', [EmailController::class, 'handleInboundWebhook']);

// 2. Endpoint Webhook Email Masuk dari Cloudflare Worker
Route::post('/webhooks/incoming-email', [InboundEmailController::class, 'store']);