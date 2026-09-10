<?php
// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\PasswordResetController;

// Autenticación
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login',    [LoginController::class, 'login']);

// Recuperación de contraseña
Route::post('/password/forgot', [PasswordResetController::class, 'sendResetLink']);
Route::post('/password/verify', [PasswordResetController::class, 'verifyToken']);
Route::post('/password/reset',  [PasswordResetController::class, 'resetPassword']);