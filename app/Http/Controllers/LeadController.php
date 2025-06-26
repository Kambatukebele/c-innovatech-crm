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

        $leads = Lead::with('assignedOperator') // eager load the operator
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('product', 'like', "%{$search}%");
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        $operators = \App\Models\User::where('role', 'operator')->get(['id', 'name']);

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $leads,
            'filters' => [
                'search' => $search,
            ],
            'operators' => $operators,
        ]);
    }


    public function assign(Request $request, Lead $lead)
    {
        $request->validate([
            'assigned_to' => ['required', 'exists:users,id'],
        ]);

        $lead->assigned_to = $request->assigned_to;
        $lead->save();

        return back()->with('success', 'Lead assigned successfully.');
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
