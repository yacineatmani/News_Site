import AppLayout from '@/layouts/AppLayout';
import OtherArticlesSection from '@/components/OtherArticlesSection';
import { Head } from '@inertiajs/react';
import type { Article } from '@/types/global';

interface TestPageProps {
    articles?: Article[];
}

// Données de test
const mockArticles = [
    {
        id: 1,
        title: "Article principal avec titre long pour tester le troncage",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        image: "https://via.placeholder.com/400x200/6366f1/ffffff?text=Article+1",
        created_at: "2024-01-15",
        category: { id: 1, name: "Technologie" },
        user: { id: 1, name: "John Doe" },
        tags: [
            { id: 1, name: "React" },
            { id: 2, name: "TypeScript" },
            { id: 3, name: "Laravel" }
        ]
    },
    {
        id: 2,
        title: "Deuxième article",
        content: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        created_at: "2024-01-14",
        category: { id: 2, name: "Design" },
        user: { id: 2, name: "Jane Smith" },
        tags: [
            { id: 4, name: "UI/UX" },
            { id: 5, name: "Figma" }
        ]
    },
    {
        id: 3,
        title: "Troisième article",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        created_at: "2024-01-13",
        category: { id: 3, name: "Business" },
        user: { id: 3, name: "Bob Johnson" },
        tags: [
            { id: 6, name: "Marketing" },
            { id: 7, name: "Stratégie" }
        ]
    },
    {
        id: 4,
        title: "Quatrième article pour tester la section autres",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        created_at: "2024-01-12",
        category: { id: 4, name: "Science" },
        user: { id: 4, name: "Alice Brown" },
        tags: [
            { id: 8, name: "Recherche" },
            { id: 9, name: "Innovation" }
        ]
    },
    {
        id: 5,
        title: "Cinquième article",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at: "2024-01-11",
        category: { id: 5, name: "Lifestyle" },
        user: { id: 5, name: "Charlie Wilson" },
        tags: [
            { id: 10, name: "Santé" },
            { id: 11, name: "Bien-être" }
        ]
    },
    {
        id: 6,
        title: "Sixième article",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        created_at: "2024-01-10",
        category: { id: 6, name: "Sport" },
        user: { id: 6, name: "David Lee" },
        tags: [
            { id: 12, name: "Football" },
            { id: 13, name: "Fitness" }
        ]
    }
];

export default function TestPage({ articles = mockArticles }: TestPageProps) {
    return (
        <AppLayout>
            <Head title="Test Layout" />
            
            <div className="py-12">
                {/* Section héro */}
                <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-12">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center">
                        <h1 className="text-4xl font-bold mb-4">Bienvenue sur Site News</h1>
                        <p className="text-xl opacity-90">
                            Découvrez les dernières actualités avec notre nouveau layout moderne
                        </p>
                    </div>
                </section>

                {/* Articles en vedette */}
                <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Articles en vedette
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.slice(0, 3).map((article) => (
                            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                                <div className="w-full h-48 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
                                    <span className="text-indigo-500 text-4xl">📰</span>
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                                        {article.category.name}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-3">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        {article.content.substring(0, 100)}...
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <span>Par {article.user.name}</span>
                                        <span>
                                            {new Date(article.created_at).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section autres articles */}
                <OtherArticlesSection articles={articles} />
            </div>
        </AppLayout>
    );
}
