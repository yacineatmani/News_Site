<?php


namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run()
    {
        $articles = [
            [
                'title' => 'Accord historique à la COP30',
                'content' => 'Un accord sans précédent a été signé lors de la COP30, marquant un tournant majeur dans la lutte contre le changement climatique. Les 196 pays participants se sont engagés à réduire leurs émissions de gaz à effet de serre de 60% d\'ici 2030.',
                'image' => 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&q=80',
                'category' => 'Climat'
            ],
            [
                'title' => 'L\'IA dépasse les attentes en 2025',
                'content' => 'L\'intelligence artificielle continue de révolutionner notre quotidien en 2025. Les nouveaux modèles d\'IA générative atteignent des performances inédites dans la création artistique et la recherche scientifique.',
                'image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
                'category' => 'Technologie'
            ],
            [
                'title' => 'Euro 2024 : les moments forts',
                'content' => 'L\'Euro 2024 a offert des moments inoubliables aux amateurs de football. Entre performances exceptionnelles et surprises des outsiders, ce championnat restera dans les mémoires.',
                'image' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
                'category' => 'Sport'
            ],
            [
                'title' => 'Festival de Cannes 2025 : les favoris',
                'content' => 'Le 78ème Festival de Cannes s\'annonce exceptionnel avec une sélection remarquable mettant l\'accent sur la diversité culturelle et les nouvelles formes de narration.',
                'image' => 'https://images.unsplash.com/photo-1489599735462-c3345854d1b0?w=800&q=80',
                'category' => 'Culture'
            ],
            [
                'title' => 'Élections mondiales : ce qui change',
                'content' => 'L\'année 2025 marque un tournant politique majeur avec plusieurs élections cruciales redéfinissant les équilibres géopolitiques.',
                'image' => 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
                'category' => 'Politique'
            ]
        ];

        foreach ($articles as $articleData) {
            $category = Category::where('name', $articleData['category'])->first();
            $user = User::where('role', 'admin')->first();

            Article::create([
                'title' => $articleData['title'],
                'content' => $articleData['content'],
                'image' => $articleData['image'],
                'user_id' => $user->id,
                'category_id' => $category->id,
                'status' => 'published' // ⭐ AJOUTER LE STATUS
            ]);
        }
    }
}