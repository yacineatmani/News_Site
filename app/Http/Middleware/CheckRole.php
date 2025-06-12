<?php


namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Si pas connecté, rediriger vers login
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();
        $userRole = trim($user->role ?? ''); // Nettoyage et valeur par défaut
        
        // Vérification simple
        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        // Accès refusé
        abort(403, "Accès refusé. Votre rôle: '{$userRole}'. Rôles requis: " . implode(', ', $roles));
    }
}