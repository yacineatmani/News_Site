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
    $articles = \App\Models\Article::with(['user', 'category'])->paginate(10);

    return inertia('Articles/Index', [
        'articles' => $articles,
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
        ]);

        $article = Article::create([
            'title' => $validate['title'],
            'content' => $validate['content'],
            'user_id' => Auth::id(),
            'category_id' => $validate['category_id'],
        ]);

        if (isset($validate['tags'])) {
            $article->tags()->sync($validate['tags']);
        }
        return redirect()->route('articles.index')->with('success', 'Article créé !');
    }

    public function show(Article $article)
    {
        $article->load(['category', 'tags', 'user']);
        return Inertia::render('Articles/Show', [
            'article' => $article,
        ]);
    }

    public function edit(Article $article)
    {
        if (Auth::user()->role === 'author' && $article->user_id !== Auth::id()) {
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
        if (Auth::user()->role === 'author' && $article->user_id !== Auth::id()) {
            return redirect()->route('articles.index')->with('error', 'Vous ne pouvez pas modifier cet article.');
        }

        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
        ]);

        $article->update([
            'title' => $validate['title'],
            'content' => $validate['content'],
            'category_id' => $validate['category_id'],
        ]);

        if (isset($validate['tags'])) {
            $article->tags()->sync($validate['tags']);
        }

        return redirect()->route('articles.index')->with('success', 'Article modifié !');
    }

    public function destroy(Article $article)
    {
        if (Auth::user()->role === 'author' && $article->user_id !== Auth::id()) {
            return redirect()->route('articles.index')->with('error', 'Vous ne pouvez pas supprimer cet article.');
        }
        $article->delete();
        return redirect()->route('articles.index')->with('success', 'Article supprimé !');
    }
}