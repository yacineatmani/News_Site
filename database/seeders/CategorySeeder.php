<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Climat', 'description' => 'Actualités environnementales'],
            ['name' => 'Technologie', 'description' => 'Innovation et tech'],
            ['name' => 'Sport', 'description' => 'Actualités sportives'],
            ['name' => 'Culture', 'description' => 'Cinéma et festivals'],
            ['name' => 'Politique', 'description' => 'Actualités politiques']
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}