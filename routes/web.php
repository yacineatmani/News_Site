<?php


use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;

// Routes publiques (lecture seule)
Route::get('/', function () {
    return Inertia::render('home');
})->name('home');




Route::get('articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('articles/{article}', [ArticleController::class, 'show'])->name('articles.show');
Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('categories/{category}', [CategoryController::class, 'show'])->name('categories.show');

// Routes protégées (CRUD complet)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('categories', CategoryController::class)->except(['index', 'show']);
    Route::resource('articles', ArticleController::class)->except(['index', 'show']);
});
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('admin/users', [DashboardController::class, 'users'])->name('admin.users');
    Route::get('admin/users/create', [DashboardController::class, 'createUser'])->name('admin.users.create');
    Route::post('admin/users', [DashboardController::class, 'storeUser'])->name('admin.users.store');
    // ...autres routes admin...
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';