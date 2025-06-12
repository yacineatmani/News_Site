<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Article $article)
    {
        $user = Auth::user();

        // Vérifier si déjà liké
        $existingLike = Like::where('user_id', $user->id)
                           ->where('article_id', $article->id)
                           ->first();

        if ($existingLike) {
            // Si déjà liké, on supprime (unlike)
            $existingLike->delete();
            $message = 'Like supprimé !';
            $liked = false;
        } else {
            // Sinon on ajoute le like
            Like::create([
                'user_id' => $user->id,
                'article_id' => $article->id,
            ]);
            $message = 'Article liké !';
            $liked = true;
        }

        // Si c'est une requête AJAX, retourner JSON
        if (request()->expectsJson()) {
            return response()->json([
                'liked' => $liked,
                'likes_count' => $article->likes()->count(),
                'message' => $message
            ]);
        }

        return back()->with('success', $message);
    }

    public function destroy(Article $article)
    {
        $user = Auth::user();
        
        Like::where('user_id', $user->id)
            ->where('article_id', $article->id)
            ->delete();

        if (request()->expectsJson()) {
            return response()->json([
                'liked' => false,
                'likes_count' => $article->likes()->count(),
                'message' => 'Like supprimé !'
            ]);
        }

        return back()->with('success', 'Like supprimé !');
    }
}