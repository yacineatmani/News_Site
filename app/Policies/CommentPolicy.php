<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;

class CommentPolicy
{
    /**
     * Tout utilisateur connecté peut créer un commentaire
     */
    public function create(User $user): bool
    {
        return true; // ⭐ CHANGÉ DE false À true
    }

    /**
     * Tout utilisateur peut voir les commentaires
     */
    public function viewAny(User $user): bool
    {
        return true; // ⭐ CHANGÉ DE false À true
    }

    /**
     * Tout utilisateur peut voir un commentaire
     */
    public function view(User $user, Comment $comment): bool
    {
        return true; // ⭐ CHANGÉ DE false À true
    }

    /**
     * Autorise la modification si l'utilisateur est l'auteur ou admin/webmaster
     */
    public function update(User $user, Comment $comment): bool
    {
        return $user->id === $comment->user_id 
            || in_array($user->role, ['admin', 'webmaster']);
    }

    /**
     * Autorise la suppression si l'utilisateur est l'auteur ou admin/webmaster
     */
    public function delete(User $user, Comment $comment): bool
    {
        return $user->id === $comment->user_id 
            || in_array($user->role, ['admin', 'webmaster']);
    }

    public function restore(User $user, Comment $comment): bool
    {
        return in_array($user->role, ['admin', 'webmaster']);
    }

    public function forceDelete(User $user, Comment $comment): bool
    {
        return $user->role === 'admin';
    }
}