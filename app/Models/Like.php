<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'article_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    // Éviter les doublons
    public static function boot()
    {
        parent::boot();
        
        static::creating(function ($like) {
            // Vérifier si le like existe déjà
            $exists = static::where('user_id', $like->user_id)
                           ->where('article_id', $like->article_id)
                           ->exists();
            
            if ($exists) {
                return false; // Empêcher la création
            }
        });
    }
}