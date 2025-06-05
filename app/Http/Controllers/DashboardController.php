<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
	public function users()
	{
		$users = User::all();
		return Inertia::render('Admin/Users/Index', ['users' => $users]);
	}

	public function createUser()
	{
		return Inertia::render('Admin/Users/Create');
	}

	public function storeUser(Request $request)
	{
		$validated = $request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|email|unique:users',
			'password' => 'required|string|min:8|confirmed',
			'role' => 'required|string', // ou enum selon ta migration
		]);

		$user = User::create([
			'name' => $validated['name'],
			'email' => $validated['email'],
			'password' => bcrypt($validated['password']),
			'role' => $validated['role'],
		]);

		return redirect()->route('admin.users')->with('success', 'Utilisateur créé');
	}
}
