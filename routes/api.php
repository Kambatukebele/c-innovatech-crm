<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopifyOrderController;
use App\Http\Controllers\LeadController;

//Commands coming from Shopify webhook
Route::post('/shopify/orders', [ShopifyOrderController::class, 'store']);
// Lead contacts coming from Shopify Newsletter
Route::post('/leads', [LeadController::class, 'store']);
