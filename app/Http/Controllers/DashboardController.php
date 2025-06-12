<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Article;
use App\Models\Category;
use App\Models\Like;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // ⭐ DASHBOARD PRINCIPAL
    public function index()
    {
        $user = Auth::user();
        
        // Statistiques de base pour tous
        $stats = [
            'total_articles' => Article::count(),
            'total_categories' => Category::count(),
        ];
        
        // Statistiques selon le rôle
        switch ($user->role) {
            case 'auteur':
                $stats['my_articles'] = Article::where('user_id', $user->id)->count();
                $stats['my_likes'] = Like::whereHas('article', function($query) use ($user) {
                    $query->where('user_id', $user->id);
                })->count();
                $stats['my_comments'] = Comment::whereHas('article', function($query) use ($user) {
                    $query->where('user_id', $user->id);
                })->count();
                break;
                
            case 'webmaster':
                $stats['total_users'] = User::where('role', '!=', 'admin')->count();
                $stats['newsletter_subscribers'] = User::where('newsletter_subscribed', true)->count();
                $stats['recent_articles'] = Article::with(['user', 'category'])
                    ->orderBy('created_at', 'desc')
                    ->take(5)
                    ->get();
                break;
                
            case 'admin':
                $stats['total_users'] = User::count();
                $stats['newsletter_subscribers'] = User::where('newsletter_subscribed', true)->count();
                $stats['users_by_role'] = User::selectRaw('role, COUNT(*) as count')
                    ->groupBy('role')
                    ->pluck('count', 'role');
                $stats['recent_users'] = User::orderBy('created_at', 'desc')
                    ->take(5)
                    ->get(['id', 'name', 'email', 'role', 'created_at']);
                $stats['all_users'] = User::orderBy('created_at', 'desc')
                    ->get(['id', 'name', 'email', 'role', 'newsletter_subscribed', 'created_at']);
                break;
        }
        
        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'userRole' => $user->role
        ]);
    }

    // ⭐ GESTION UTILISATEURS (ADMIN UNIQUEMENT)
    public function users()
    {
        $this->authorizeAdmin();
        
        $users = User::orderBy('created_at', 'desc')->paginate(20);
        
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => ['auteur', 'webmaster', 'admin']
        ]);
    }

    public function createUser()
    {
        $this->authorizeAdmin();
        
        return Inertia::render('Admin/Users/Create', [
            'roles' => ['auteur', 'webmaster', 'admin']
        ]);
    }

    public function storeUser(Request $request)
    {
        $this->authorizeAdmin();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:auteur,webmaster,admin',
            'newsletter_subscribed' => 'boolean'
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'newsletter_subscribed' => $validated['newsletter_subscribed'] ?? false,
            'email_verified_at' => now()
        ]);

        return redirect()->route('admin.users')->with('success', 'Utilisateur créé avec succès');
    }

    public function editUser(User $user)
    {
        $this->authorizeAdmin();
        
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => ['auteur', 'webmaster', 'admin']
        ]);
    }

    public function updateUser(Request $request, User $user)
    {
        $this->authorizeAdmin();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:auteur,webmaster,admin',
            'newsletter_subscribed' => 'boolean',
            'password' => 'nullable|string|min:8|confirmed'
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'newsletter_subscribed' => $validated['newsletter_subscribed'] ?? false
        ];

        // Mettre à jour le mot de passe seulement si fourni
        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return redirect()->route('admin.users')->with('success', 'Utilisateur modifié avec succès');
    }

    public function destroyUser(User $user)
    {
        $this->authorizeAdmin();
        
        // Empêcher la suppression de son propre compte
        if ($user->id === Auth::id()) {
            return redirect()->route('admin.users')->with('error', 'Vous ne pouvez pas supprimer votre propre compte');
        }
        
        // Empêcher la suppression du dernier admin
        if ($user->role === 'admin' && User::where('role', 'admin')->count() <= 1) {
            return redirect()->route('admin.users')->with('error', 'Impossible de supprimer le dernier administrateur');
        }

        $user->delete();
        return redirect()->route('admin.users')->with('success', 'Utilisateur supprimé avec succès');
    }

    // ⭐ CHANGER LE RÔLE D'UN UTILISATEUR (ADMIN UNIQUEMENT)
    public function changeUserRole(Request $request, User $user)
    {
        $this->authorizeAdmin();
        
        $validated = $request->validate([
            'role' => 'required|in:auteur,webmaster,admin'
        ]);

        // Empêcher de changer son propre rôle
        if ($user->id === Auth::id()) {
            return back()->with('error', 'Vous ne pouvez pas modifier votre propre rôle');
        }
        
        // Empêcher de retirer le rôle admin au dernier admin
        if ($user->role === 'admin' && $validated['role'] !== 'admin' && User::where('role', 'admin')->count() <= 1) {
            return back()->with('error', 'Impossible de retirer le rôle admin au dernier administrateur');
        }

        $user->update(['role' => $validated['role']]);
        
        return back()->with('success', "Rôle changé vers {$validated['role']} avec succès");
    }

    // ⭐ TOGGLE NEWSLETTER (ADMIN UNIQUEMENT)
    public function toggleNewsletter(User $user)
    {
        $this->authorizeAdmin();
        
        $user->update([
            'newsletter_subscribed' => !$user->newsletter_subscribed
        ]);
        
        $status = $user->newsletter_subscribed ? 'abonné à' : 'désabonné de';
        return back()->with('success', "Utilisateur {$status} la newsletter");
    }

    // ⭐ STATISTIQUES AVANCÉES (ADMIN UNIQUEMENT)
    public function stats()
    {
        $this->authorizeAdmin();
        
        $stats = [
            'total_users' => User::count(),
            'total_articles' => Article::count(),
            'total_categories' => Category::count(),
            'total_likes' => Like::count(),
            'total_comments' => Comment::count(),
            'newsletter_subscribers' => User::where('newsletter_subscribed', true)->count(),
            
            // Statistiques par rôle
            'users_by_role' => User::selectRaw('role, COUNT(*) as count')
                ->groupBy('role')
                ->pluck('count', 'role'),
                
            // Articles les plus populaires
            'popular_articles' => Article::withCount('likes')
                ->with(['user', 'category'])
                ->orderBy('likes_count', 'desc')
                ->take(10)
                ->get(),
                
            // Auteurs les plus actifs
            'active_authors' => User::withCount('articles')
                ->where('role', 'auteur')
                ->orderBy('articles_count', 'desc')
                ->take(5)
                ->get(),
                
            // Inscriptions par mois (6 derniers mois)
            'monthly_registrations' => User::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
                ->where('created_at', '>=', now()->subMonths(6))
                ->groupBy('month')
                ->orderBy('month')
                ->pluck('count', 'month'),
        ];

        return Inertia::render('Admin/Stats', ['stats' => $stats]);
    }

    // ⭐ MÉTHODE PRIVÉE POUR VÉRIFIER LES DROITS ADMIN
    private function authorizeAdmin()
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Accès refusé. Droits administrateur requis.');
        }
    }
}