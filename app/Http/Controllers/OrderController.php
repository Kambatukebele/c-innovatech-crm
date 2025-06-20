<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


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
    public function fulfill(Order $order)
    {
        $shopify = json_decode($order->raw);

        $shipping = $shopify->shipping_address ?? $shopify->billing_address;

        if (!$shipping) {
            return back()->with('error', 'No shipping address found.');
        }

        // Determine if order is COD
        $isCod = collect($shopify->payment_gateway_names ?? [])->contains(function ($gateway) {
            return str_contains(strtolower($gateway), 'cod') || str_contains(strtolower($gateway), 'cash');
        });

        $codAmount = $isCod ? floatval($shopify->total_price ?? 0) : 0;

        $payload = [
            "Shipping" => [
                "Account" => "CITS",
                "Reference" => 'SHOP-' . $order->shopify_order_id,
                "TransitGatewayId" => "CDG",
                "Agent" => "FR-NTUPS",
                "ServiceCode" => "ECO",
                "COD" => $codAmount,
                "OnLineCOD" => $codAmount,
                "IOSS" => "",
                "Incoterm" => "DDP",
                "WeightUnit" => "kg",
                "DimensionUnit" => "cm",
                "Currency" => "EUR",
                "OrderFulfillment" => true,
                "Warehouse" => "CDG"
            ],
            "Consignee" => [
                "CompanyName" => "",
                "ContactName" => $shipping->name ?? "{$shipping->first_name} {$shipping->last_name}",
                "Street" => $shipping->address1,
                "AddressLine2" => $shipping->address2 ?? '',
                "AddressLine3" => "",
                "PostCode" => $shipping->zip,
                "City" => $shipping->city,
                "State" => "",
                "Country" => $shipping->country_code,
                "Email" => $order->email,
                "Phone" => $shipping->phone ?? '',
                "SecondPhone" => "",
                "Eori" => "",
                "Notes" => "",
                "Reference1" => "",
                "Reference2" => ""
            ],
            "Items" => collect(json_decode($order->items))->map(function ($item) {
                return [
                    "Code" => $item->sku ?? 'NO-SKU',
                    "Reference" => $item->product_id ?? '',
                    "Description" => $item->title,
                    "GoodsOrigin" => "",
                    "HSCode" => "",
                    "Quantity" => $item->quantity,
                    "Value" => 0,
                    "Weight" => 0,
                    "Dutiable" => true
                ];
            })->toArray()
        ];
        // return response(
        //     "<pre>" . json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "</pre>",
        //     200,
        //     ['Content-Type' => 'text/html']
        // );


        $response = Http::withHeaders([
            'apiKey' => config('services.traxis.api_key'),
            'Content-Type' => 'application/json',
        ])->post('https://traxis.app/external/api/shipments/booking', $payload);

        if ($response->successful()) {
            $order->update(['status' => 'sent']);
            return back()->with('success', 'Order sent to fulfillment successfully.');
        }

        return back()->with('error', 'Failed to send order to fulfillment.');
    }
    public function sent(Request $request)
    {
        $query = Order::where('status', 'sent');

        if ($request->filled('search')) {
            $query->where('shopify_order_id', 'like', '%' . $request->search . '%');
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Orders/Sent', [
            'orders' => $orders,
            'filters' => $request->only('search'),
        ]);
    }
    public function show(Order $order)
    {
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }
}
