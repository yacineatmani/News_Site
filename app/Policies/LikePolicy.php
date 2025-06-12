<?php

namespace App\Policies;

use App\Models\Like;
use App\Models\User;

class LikePolicy
{
    /**
     * Tout utilisateur connecté peut liker
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * L'utilisateur peut supprimer son propre like
     */
    public function delete(User $user, Like $like): bool
    {
        return $user->id === $like->user_id;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Like $like): bool
    {
        return true;
    }

    public function update(User $user, Like $like): bool
    {
        return false; // Les likes ne se modifient pas
    }

    public function restore(User $user, Like $like): bool
    {
        return false;
    }

    public function forceDelete(User $user, Like $like): bool
    {
        return $user->role === 'admin';
    }
}