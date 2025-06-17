<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Order;

class ShopifyOrderController extends Controller
{
    public function store(Request $request)
    {

        $data = $request->all();

        // Save the order into the database
        Order::create([
            'shopify_order_id' => $data['id'],
            'customer_name' => $data['customer']['first_name'] . ' ' . $data['customer']['last_name'],
            'email' => $data['email'],
            'items' => json_encode($data['line_items']),
            'raw' => json_encode($data),
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Order saved'], 200);
    }
}
