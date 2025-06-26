<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $leads = Lead::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('product', 'like', "%{$search}%");
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $leads,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|min:4',
            'phone_number' => 'required|string',
            'email' => 'required|email',
            'product' => 'nullable|string'
        ]);

        Lead::create($data);

        return response()->json(['message' => 'Lead saved successfully'], 200);
    }
}
