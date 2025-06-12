<?php

namespace App\Providers;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Like;
use App\Policies\ArticlePolicy;
use App\Policies\CommentPolicy;
use App\Policies\LikePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Article::class => ArticlePolicy::class,
        Comment::class => CommentPolicy::class,
        Like::class => LikePolicy::class, // ⭐ AJOUTER CETTE LIGNE
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}