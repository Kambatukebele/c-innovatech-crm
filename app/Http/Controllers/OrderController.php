<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {

        $orders = Order::where('status', 'pending')->latest()->get();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }
}
