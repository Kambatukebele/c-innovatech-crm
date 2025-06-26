<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;

class LeadController extends Controller
{
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
