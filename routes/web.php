<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Routes Web
|--------------------------------------------------------------------------
*/

// Page d'accueil
Route::get('/', [HomeController::class, 'index'])->name('home');

// Articles publics (lecture seule) - ORDRE CORRIGÉ
Route::get('articles', [ArticleController::class, 'index'])->name('articles.index');

// Catégories publiques (lecture seule) - ORDRE CORRIGÉ  
Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');

// Newsletter public
Route::post('newsletter/subscribe', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
Route::get('newsletter/unsubscribe/{encodedEmail}', [NewsletterController::class, 'unsubscribe'])->name('newsletter.unsubscribe');

// Routes authentifiées
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Articles - création/modification (authentifiés) - ORDRE IMPORTANT: créer AVANT show
    Route::get('articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::put('articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::delete('articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    
    // Catégories - création/modification (authentifiés) - ORDRE IMPORTANT: créer AVANT show
    Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    
    // Likes et commentaires
    Route::post('articles/{article}/like', [LikeController::class, 'store'])->name('articles.like');
    Route::delete('articles/{article}/unlike', [LikeController::class, 'destroy'])->name('articles.unlike');
    Route::post('articles/{article}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    
    // Newsletter admin
    Route::prefix('newsletter')->name('newsletter.')->group(function () {
        Route::get('/', [NewsletterController::class, 'index'])->name('index');
        Route::get('preview', [NewsletterController::class, 'preview'])->name('preview');
        Route::post('send', [NewsletterController::class, 'send'])->name('send');
    });
});

// Routes admin
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('users', [DashboardController::class, 'users'])->name('users');
    Route::get('users/create', [DashboardController::class, 'createUser'])->name('users.create');
    Route::post('users', [DashboardController::class, 'storeUser'])->name('users.store');
    Route::get('users/{user}/edit', [DashboardController::class, 'editUser'])->name('users.edit');
    Route::put('users/{user}', [DashboardController::class, 'updateUser'])->name('users.update');
    Route::delete('users/{user}', [DashboardController::class, 'destroyUser'])->name('users.destroy');    Route::patch('users/{user}/role', [DashboardController::class, 'changeUserRole'])->name('users.change-role');
    Route::patch('users/{user}/newsletter', [DashboardController::class, 'toggleNewsletter'])->name('users.toggle-newsletter');
    Route::get('stats', [DashboardController::class, 'stats'])->name('stats');
});

// 🚨 ROUTE TEMPORAIRE POUR TEST - À SUPPRIMER APRÈS
Route::get('test-verify/{id}', function($id) {
    $user = \App\Models\User::findOrFail($id);
    $user->markEmailAsVerified();
    return redirect()->route('dashboard')->with('message', 'Email vérifié avec succès !');
})->name('test.verify');

// Routes paramétrées à la FIN (après toutes les routes spécifiques)
Route::get('articles/{article}', [ArticleController::class, 'show'])->name('articles.show');
Route::get('categories/{category}', [CategoryController::class, 'show'])->name('categories.show');

// Fichiers de routes additionnels
require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
