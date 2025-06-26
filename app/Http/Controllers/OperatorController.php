<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class OperatorController extends Controller
{
    public function index()
    {
        $operators = User::where('role', 'operator')->latest()->paginate(10);
        return Inertia::render('Admin/Operators/Index', compact('operators'));
    }

    public function create()
    {
        return Inertia::render('Admin/Operators/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'operator';

        User::create($data);

        return redirect()->route('admin.operators.index')->with('success', 'Operator created successfully.');
    }

    public function edit(User $operator)
    {
        return Inertia::render('Admin/Operators/Edit', ['operator' => $operator]);
    }

    public function update(Request $request, User $operator)
    {
        $data = $request->validate([
            'name' => 'required|string|min:3',
            'email' => 'required|email|unique:users,email,' . $operator->id,
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        if ($data['password']) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $operator->update($data);

        return redirect()->route('admin.operators.index')->with('success', 'Operator updated successfully.');
    }

    public function destroy(User $operator)
    {
        $operator->delete();
        return back()->with('success', 'Operator deleted.');
    }
}
