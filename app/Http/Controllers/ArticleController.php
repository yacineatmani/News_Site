<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with(['user', 'category', 'tags'])
                          ->withCount(['likes', 'comments'])
                          ->orderBy('created_at', 'desc')
                          ->paginate(12);

        // Ajouter les informations de like pour l'utilisateur connecté
        if (auth()->check()) {
            foreach ($articles as $article) {
                $article->user_has_liked = $article->likes()
                    ->where('user_id', auth()->id())
                    ->exists();
            }
        }

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function show(Article $article)
    {
        $article->load(['user', 'category', 'tags']);
        
        // Récupérer les commentaires avec leurs auteurs
        $comments = $article->comments()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Vérifier si l'utilisateur connecté a liké l'article
        $userLiked = false;
        if (auth()->check()) {
            $userLiked = $article->likes()->where('user_id', auth()->id())->exists();
        }
        
        return Inertia::render('Articles/Show', [
            'article' => $article,
            'comments' => $comments,
            'userLiked' => $userLiked,
            'likesCount' => $article->likes()->count(),
            'commentsCount' => $comments->count(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Articles/Create', [
            'categories' => Category::all(),
            'tags' => Tag::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
            'image' => 'nullable|image|max:6048'
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        $article = Article::create([
            'title' => $validate['title'],
            'content' => $validate['content'],
            'user_id' => Auth::id(),
            'category_id' => $validate['category_id'],
            'image' => $imagePath,
        ]);

        if (isset($validate['tags'])) {
            $article->tags()->sync($validate['tags']);
        }

        return redirect()->route('articles.index')->with('success', 'Article créé !');
    }

    public function edit(Article $article)
    {
        if (Auth::user()->role === 'auteur' && $article->user_id !== Auth::id()) {
            return redirect()->route('articles.index')->with('error', 'Vous ne pouvez pas éditer cet article.');
        }

        return Inertia::render('Articles/Edit', [
            'article' => $article->load('tags'),
            'categories' => Category::all(),
            'tags' => Tag::all(),
        ]);
    }

    public function update(Request $request, Article $article)
    {
        if (Auth::user()->role === 'auteur' && $article->user_id !== Auth::id()) {
            return redirect()->route('articles.index')->with('error', 'Vous ne pouvez pas modifier cet article.');
        }

        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'image' => 'nullable|image|max:2048'
        ]);

        $data = [
            'title' => $validate['title'],
            'content' => $validate['content'],
            'category_id' => $validate['category_id'],
        ];

        if ($request->hasFile('image')) {
            if ($article->image && file_exists(storage_path('app/public/' . $article->image))) {
                unlink(storage_path('app/public/' . $article->image));
            }
            
            $data['image'] = $request->file('image')->store('articles', 'public');
        }

        $article->update($data);

        if (isset($validate['tags'])) {
            $article->tags()->sync($validate['tags']);
        } else {
            $article->tags()->sync([]);
        }

        return redirect()->route('articles.show', $article)->with('success', 'Article modifié !');
    }

    public function destroy(Article $article)
    {
        if (Auth::user()->role === 'auteur' && $article->user_id !== Auth::id()) {
            return redirect()->route('articles.index')->with('error', 'Vous ne pouvez pas supprimer cet article.');
        }

        if ($article->image && file_exists(storage_path('app/public/' . $article->image))) {
            unlink(storage_path('app/public/' . $article->image));
        }

        $article->delete();
        return redirect()->route('articles.index')->with('success', 'Article supprimé !');
    }
}