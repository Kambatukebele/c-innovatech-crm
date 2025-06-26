<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        $totalOrders = Order::count();
        $pendingOrders = Order::where('status', 'pending')->count();
        $sentOrders = Order::where('status', 'sent')->count();
        $failedOrders = Order::where('status', 'failed')->count();

        $recentOrders = Order::latest()->take(5)->get();

        $leadCount = Lead::count();
        $operatorCount = User::where('role', 'operator')->count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total' => $totalOrders,
                'pending' => $pendingOrders,
                'fulfilled' => $sentOrders,
                'failed' => $failedOrders,
                'leads' => $leadCount,
                'operators' => $operatorCount,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}
