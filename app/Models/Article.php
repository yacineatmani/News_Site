<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title', 'content', 'user_id', 'category_id', 'image', 'status' // ⭐ AJOUTER status
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }


public function likes()
{
    return $this->hasMany(Like::class);
}

public function comments()
{
    return $this->hasMany(Comment::class);
}

// Vérifier si un utilisateur a liké cet article
public function isLikedBy($userId)
{
    return $this->likes()->where('user_id', $userId)->exists();
}

// Obtenir le nombre de likes
public function getLikesCountAttribute()
{
    return $this->likes()->count();
}

// Obtenir le nombre de commentaires
public function getCommentsCountAttribute()
{
    return $this->comments()->count();
}
}