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
        // Récupérer les articles avec toutes les relations et informations nécessaires
        $articles = Article::with(['user', 'category', 'tags'])
            ->withCount(['likes', 'comments'])
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