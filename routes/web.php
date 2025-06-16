<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


// Admin dashboard
Route::middleware(['auth', 'role:admin'])->get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->name('admin.dashboard');

// Operator dashboard
Route::middleware(['auth', 'role:operator'])->get('/operator/dashboard', function () {
    return Inertia::render('Operator/Dashboard');
})->name('operator.dashboard');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
