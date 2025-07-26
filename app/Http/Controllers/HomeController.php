<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        // Récupérer les articles PUBLIÉS avec toutes les relations et informations nécessaires
        $articles = Article::with(['user', 'category', 'tags'])
            ->withCount(['likes', 'comments'])
            ->where('status', 'published') // ⭐ Filtrer seulement les articles publiés
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        // Si un utilisateur est connecté, vérifier quels articles il a likés
        if (Auth::check()) {
            foreach ($articles as $article) {
                $article->user_has_liked = $article->likes()
                    ->where('user_id', Auth::id())
                    ->exists();
            }
        } else {
            foreach ($articles as $article) {
                $article->user_has_liked = false;
            }
        }

        return Inertia::render('Welcome', [
            'articles' => $articles
        ]);
    }
}