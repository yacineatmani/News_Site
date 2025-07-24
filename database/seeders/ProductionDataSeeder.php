<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Article;
use App\Models\Tag;
use Illuminate\Support\Facades\Hash;

class ProductionDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Créer les utilisateurs
        $admin = User::create([
            'name' => 'Admin NewsZone',
            'email' => 'admin@newszone.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
            'newsletter_subscribed' => true,
        ]);

        $webmaster = User::create([
            'name' => 'Webmaster',
            'email' => 'webmaster@newszone.com',
            'password' => Hash::make('password'),
            'role' => 'webmaster',
            'email_verified_at' => now(),
            'newsletter_subscribed' => true,
        ]);

        $author = User::create([
            'name' => 'Auteur Principal',
            'email' => 'auteur@newszone.com',
            'password' => Hash::make('password'),
            'role' => 'auteur',
            'email_verified_at' => now(),
            'newsletter_subscribed' => false,
        ]);

        // 2. Créer les catégories
        $tech = Category::create([
            'name' => 'Technologie',
            'description' => 'Actualités technologiques et innovations',
        ]);

        $dev = Category::create([
            'name' => 'Développement',
            'description' => 'Programmation et développement web',
        ]);

        $design = Category::create([
            'name' => 'Design',
            'description' => 'Design UI/UX et tendances visuelles',
        ]);

        // 3. Créer les tags
        $tags = [];
        $tagNames = ['Laravel', 'React', 'JavaScript', 'PHP', 'CSS', 'Tailwind', 'Vue.js', 'Node.js', 'Python', 'AI'];
        
        foreach ($tagNames as $tagName) {
            $tags[] = Tag::create(['name' => $tagName]);
        }

        // 4. Créer les articles
        $articles = [
            [
                'title' => 'Laravel 11 : Les nouveautés révolutionnaires',
                'content' => 'Laravel 11 apporte de nombreuses améliorations qui vont changer votre façon de développer. Découvrez les nouvelles fonctionnalités, l\'amélioration des performances et les nouveaux outils qui font de cette version un incontournable pour tout développeur PHP moderne.',
                'user_id' => $admin->id,
                'category_id' => $dev->id,
                'status' => 'published',
                'created_at' => now()->subDays(5),
            ],
            [
                'title' => 'React 18 et les Server Components : Guide complet',
                'content' => 'Les Server Components de React 18 révolutionnent la façon dont nous construisons des applications web. Ce guide complet vous explique comment les utiliser, leurs avantages et comment migrer vos projets existants pour bénéficier de ces nouvelles fonctionnalités.',
                'user_id' => $author->id,
                'category_id' => $dev->id,
                'status' => 'published',
                'created_at' => now()->subDays(3),
            ],
            [
                'title' => 'Intelligence Artificielle en 2025 : Tendances et innovations',
                'content' => 'L\'année 2025 marque un tournant dans le développement de l\'IA. Entre les nouveaux modèles de langage, l\'amélioration des performances et les nouvelles applications, découvrez ce qui vous attend dans le monde de l\'intelligence artificielle.',
                'user_id' => $webmaster->id,
                'category_id' => $tech->id,
                'status' => 'published',
                'created_at' => now()->subDays(1),
            ],
            [
                'title' => 'Tailwind CSS 4.0 : Révolution du design web',
                'content' => 'Tailwind CSS 4.0 introduit de nouveaux concepts révolutionnaires pour le design web. Variables CSS natives, nouvelle syntaxe et outils améliorés : tout ce que vous devez savoir sur cette mise à jour majeure.',
                'user_id' => $author->id,
                'category_id' => $design->id,
                'status' => 'published',
                'created_at' => now()->subHours(12),
            ],
            [
                'title' => 'Sécurité web en 2025 : Meilleures pratiques',
                'content' => 'La sécurité web évolue constamment. Découvrez les dernières menaces, les nouvelles techniques de protection et les meilleures pratiques à adopter pour sécuriser vos applications web en 2025.',
                'user_id' => $admin->id,
                'category_id' => $tech->id,
                'status' => 'published',
                'created_at' => now()->subHours(6),
            ],
        ];

        foreach ($articles as $articleData) {
            $article = Article::create($articleData);
            
            // Attacher des tags aléatoires
            $randomTags = collect($tags)->random(rand(2, 4));
            $article->tags()->attach($randomTags->pluck('id'));
        }

        $this->command->info('🎉 Données de production créées avec succès !');
        $this->command->info('👤 Utilisateurs créés : admin@newszone.com, webmaster@newszone.com, auteur@newszone.com');
        $this->command->info('🔑 Mot de passe pour tous : password');
        $this->command->info('📰 ' . count($articles) . ' articles créés');
        $this->command->info('📂 ' . count($tagNames) . ' tags créés');
    }
}
