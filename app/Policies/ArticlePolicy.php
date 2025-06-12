<?php


namespace App\Policies;

use App\Models\Article;
use App\Models\User;

class ArticlePolicy
{
    /**
     * L'utilisateur peut modifier si c'est son article ou s'il est admin/webmaster.
     */
    public function update(User $user, Article $article): bool
    {
        return $user->id === $article->user_id
            || $user->role === 'admin'
            || $user->role === 'webmaster';
    }

    /**
     * L'utilisateur peut supprimer si c'est son article ou s'il est admin/webmaster.
     */
    public function delete(User $user, Article $article): bool
    {
        return $user->id === $article->user_id
            || $user->role === 'admin'
            || $user->role === 'webmaster';
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Article $article): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        // Auteur, webmaster, admin peuvent créer
        return in_array($user->role, ['auteur', 'webmaster', 'admin']);
    }

    public function restore(User $user, Article $article): bool
    {
        return false;
    }

    public function forceDelete(User $user, Article $article): bool
    {
        return false;
    }
}