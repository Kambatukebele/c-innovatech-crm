<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth'])->group(function () {
    // Admin dashboard - only for users with 'admin' role
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('admin.dashboard');
        Route::get('/admin/dashboard/orders', [OrderController::class, 'index'])
            ->name('orders.index');
        Route::post('admin/dashboard/orders/{order}/fulfill', [OrderController::class, 'fulfill'])->name('orders.fulfill');
    });

    // Operator dashboard - only for users with 'operator' role
    Route::middleware(['role:operator'])->group(function () {
        Route::get('/operator/dashboard', function () {
            return Inertia::render('Operator/Dashboard');
        })->name('operator.dashboard');
    });
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
