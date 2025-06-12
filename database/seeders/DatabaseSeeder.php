<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin',
            'email' => 'admins@site.test',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Webmaster
        User::create([
            'name' => 'Webmaster',
            'email' => 'webmaster@site.test',
            'password' => Hash::make('password'),
            'role' => 'webmaster',
        ]);

        // Auteur
        User::create([
            'name' => 'Auteur',
            'email' => 'auteur@site.test',
            'password' => Hash::make('password'),
            'role' => 'auteur',
        ]);

        // Lecteur
        User::create([
            'name' => 'Lecteur',
            'email' => 'lecteur@site.test',
            'password' => Hash::make('password'),
            'role' => 'lecteur',
        ]);

        // Créer les catégories SEULEMENT avec le nom
        $categories = ['Climat', 'Technologie', 'Sport', 'Culture', 'Politique'];

        foreach ($categories as $categoryName) {
            Category::create(['name' => $categoryName]);
        }

        // Appeler ArticleSeeder
        $this->call([
            ArticleSeeder::class,
        ]);
    }
}