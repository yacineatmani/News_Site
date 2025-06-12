<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request, Article $article)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        Comment::create([
            'content' => $request->content,
            'user_id' => Auth::id(),
            'article_id' => $article->id,
        ]);

        return back()->with('success', 'Commentaire ajouté avec succès !');
    }

    public function destroy(Comment $comment)
    {
        // Seul l'auteur du commentaire ou un admin peut le supprimer
        if (Auth::id() !== $comment->user_id && !in_array(Auth::user()->role, ['admin', 'webmaster'])) {
            return back()->with('error', 'Non autorisé à supprimer ce commentaire.');
        }

        $comment->delete();
        return back()->with('success', 'Commentaire supprimé !');
    }
}