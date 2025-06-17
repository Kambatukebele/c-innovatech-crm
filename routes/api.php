<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopifyOrderController;

Route::post('/shopify/orders', [ShopifyOrderController::class, 'store']);
