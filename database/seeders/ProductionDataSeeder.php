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
        // 1. Créer les utilisateurs (vérifier s'ils existent déjà)
        $admin = User::firstOrCreate(
            ['email' => 'admin@newszone.com'],
            [
                'name' => 'Admin NewsZone',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
                'newsletter_subscribed' => true,
            ]
        );

        $webmaster = User::firstOrCreate(
            ['email' => 'webmaster@newszone.com'],
            [
                'name' => 'Webmaster',
                'password' => Hash::make('password'),
                'role' => 'webmaster',
                'email_verified_at' => now(),
                'newsletter_subscribed' => true,
            ]
        );

        $author = User::firstOrCreate(
            ['email' => 'auteur@newszone.com'],
            [
                'name' => 'Auteur Principal',
                'password' => Hash::make('password'),
                'role' => 'auteur',
                'email_verified_at' => now(),
                'newsletter_subscribed' => false,
            ]
        );

        // 2. Créer les catégories (vérifier s'elles existent déjà)
        $tech = Category::firstOrCreate(
            ['name' => 'Technologie'],
            ['description' => 'Actualités technologiques et innovations']
        );

        $dev = Category::firstOrCreate(
            ['name' => 'Développement'],
            ['description' => 'Programmation et développement web']
        );

        $design = Category::firstOrCreate(
            ['name' => 'Design'],
            ['description' => 'Design UI/UX et tendances visuelles']
        );

        // 3. Créer les tags
        $tags = [];
        $tagNames = ['Laravel', 'React', 'JavaScript', 'PHP', 'CSS', 'Tailwind', 'Vue.js', 'Node.js', 'Python', 'AI'];
        
        foreach ($tagNames as $tagName) {
            $tags[] = Tag::create(['name' => $tagName]);
        }

        // Ajout des catégories manquantes pour vos anciens articles
        $climat = Category::firstOrCreate(
            ['name' => 'Climat'],
            ['description' => 'Actualités environnementales et changement climatique']
        );

        $sport = Category::firstOrCreate(
            ['name' => 'Sport'],
            ['description' => 'Actualités sportives et compétitions']
        );

        $culture = Category::firstOrCreate(
            ['name' => 'Culture'],
            ['description' => 'Arts, spectacles et patrimoine culturel']
        );

        $politique = Category::firstOrCreate(
            ['name' => 'Politique'],
            ['description' => 'Actualités politiques et société']
        );

        // 3. Créer les tags (vérifier s'ils existent déjà)
        $tags = [];
        $tagNames = ['Laravel', 'React', 'JavaScript', 'PHP', 'CSS', 'Tailwind', 'Vue.js', 'Node.js', 'Python', 'AI'];
        
        foreach ($tagNames as $tagName) {
            $tags[] = Tag::firstOrCreate(['name' => $tagName]);
        }

        // 4. Créer les articles (anciens + nouveaux)
        $articles = [
            // ===== VOS ARTICLES ORIGINAUX =====
            [
                'title' => 'Accord historique à la COP30',
                'content' => 'Un accord sans précédent a été signé lors de la COP30, marquant un tournant majeur dans la lutte contre le changement climatique. Les 196 pays participants se sont engagés à réduire leurs émissions de gaz à effet de serre de 60% d\'ici 2030.',
                'image' => 'image/Environement.jpg',
                'user_id' => $admin->id,
                'category_id' => $climat->id,
                'status' => 'published',
                'created_at' => now()->subDays(10),
            ],
            [
                'title' => 'L\'IA dépasse les attentes en 2025',
                'content' => 'L\'intelligence artificielle continue de révolutionner notre quotidien en 2025. Les nouveaux modèles d\'IA générative atteignent des performances inédites dans la création artistique et la recherche scientifique.',
                'image' => 'image/IA2.jpg',
                'user_id' => $webmaster->id,
                'category_id' => $tech->id,
                'status' => 'published',
                'created_at' => now()->subDays(8),
            ],
            [
                'title' => 'Euro 2024 : les moments forts',
                'content' => 'L\'Euro 2024 a offert des moments inoubliables aux amateurs de football. Entre performances exceptionnelles et surprises des outsiders, ce championnat restera dans les mémoires.',
                'image' => 'image/euro2024.jpg',
                'user_id' => $author->id,
                'category_id' => $sport->id,
                'status' => 'published',
                'created_at' => now()->subDays(7),
            ],
            [
                'title' => 'Festival de Cannes 2025 : les favoris',
                'content' => 'Le 78ème Festival de Cannes s\'annonce exceptionnel avec une sélection remarquable mettant l\'accent sur la diversité culturelle et les nouvelles formes de narration.',
                'image' => 'image/Festival-Cannes.jpg',
                'user_id' => $author->id,
                'category_id' => $culture->id,
                'status' => 'published',
                'created_at' => now()->subDays(6),
            ],
            [
                'title' => 'Élections mondiales : ce qui change',
                'content' => 'L\'année 2025 marque un tournant politique majeur avec plusieurs élections cruciales redéfinissant les équilibres géopolitiques.',
                'image' => 'image/Election.jpg',
                'user_id' => $admin->id,
                'category_id' => $politique->id,
                'status' => 'published',
                'created_at' => now()->subDays(5),
            ],

            // ===== NOUVEAUX ARTICLES TECHNIQUES =====
            [
                'title' => 'Laravel 11 : Les nouveautés révolutionnaires',
                'content' => 'Laravel 11 apporte de nombreuses améliorations qui vont changer votre façon de développer. Découvrez les nouvelles fonctionnalités, l\'amélioration des performances et les nouveaux outils qui font de cette version un incontournable pour tout développeur PHP moderne.',
                'user_id' => $admin->id,
                'category_id' => $dev->id,
                'status' => 'published',
                'created_at' => now()->subDays(4),
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
                'created_at' => now()->subDays(2),
            ],
            [
                'title' => 'Tailwind CSS 4.0 : Révolution du design web',
                'content' => 'Tailwind CSS 4.0 introduit de nouveaux concepts révolutionnaires pour le design web. Variables CSS natives, nouvelle syntaxe et outils améliorés : tout ce que vous devez savoir sur cette mise à jour majeure.',
                'user_id' => $author->id,
                'category_id' => $design->id,
                'status' => 'published',
                'created_at' => now()->subDays(1),
            ],
            [
                'title' => 'Sécurité web en 2025 : Meilleures pratiques',
                'content' => 'La sécurité web évolue constamment. Découvrez les dernières menaces, les nouvelles techniques de protection et les meilleures pratiques à adopter pour sécuriser vos applications web en 2025.',
                'user_id' => $admin->id,
                'category_id' => $tech->id,
                'status' => 'published',
                'created_at' => now()->subHours(12),
            ],
        ];

        foreach ($articles as $articleData) {
            // Vérifier si l'article existe déjà (par titre)
            $existingArticle = Article::where('title', $articleData['title'])->first();
            
            if (!$existingArticle) {
                $article = Article::create($articleData);
                
                // Attacher des tags aléatoires
                $randomTags = collect($tags)->random(rand(2, 4));
                $article->tags()->attach($randomTags->pluck('id'));
            }
        }

        $this->command->info('🎉 Données de production créées avec succès !');
        $this->command->info('👤 Utilisateurs créés : admin@newszone.com, webmaster@newszone.com, auteur@newszone.com');
        $this->command->info('🔑 Mot de passe pour tous : password');
        $this->command->info('📰 ' . count($articles) . ' articles créés (anciens + nouveaux)');
        $this->command->info('📂 ' . count($tagNames) . ' tags créés');
        $this->command->info('🏷️ 7 catégories créées (Technologie, Développement, Design, Climat, Sport, Culture, Politique)');
    }
}
