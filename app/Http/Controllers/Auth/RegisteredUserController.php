<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // 🔍 DEBUG TEMPORAIRE pour Railway
        \Log::info('INSCRIPTION ATTEMPT:', [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'user_agent' => $request->userAgent(),
            'ip' => $request->ip()
        ]);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'lecteur', // Rôle par défaut
                'newsletter_subscribed' => false, // Par défaut pas abonné
            ]);

            \Log::info('USER CREATED:', ['user_id' => $user->id, 'email' => $user->email]);

            event(new Registered($user));
            Auth::login($user);

            \Log::info('USER LOGGED IN');

            // Rediriger vers la page de vérification email au lieu du dashboard
            return to_route('verification.notice');
        } catch (\Exception $e) {
            \Log::error('INSCRIPTION ERROR:', ['error' => $e->getMessage()]);
            throw $e;
        }
    }
}
