import AppLayout from '@/layouts/AppLayout';
import OtherArticlesSection from '@/components/OtherArticlesSection';

// Données d'exemple pour les articles
const sampleArticles = [
    {
        id: 1,
        title: "L'avenir de l'intelligence artificielle en 2025",
        content: "L'intelligence artificielle continue de révolutionner notre façon de travailler et de vivre. Dans cet article, nous explorons les dernières tendances et innovations qui marqueront l'année 2025.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&crop=center",
        created_at: "2025-06-10T10:00:00Z",
        category: { id: 1, name: "Technologie" },
        user: { id: 1, name: "Marie Dupont" },
        tags: [
            { id: 1, name: "IA" },
            { id: 2, name: "Innovation" },
            { id: 3, name: "Futur" }
        ]
    },
    {
        id: 2,
        title: "Les nouvelles tendances du développement web",
        content: "Découvrez les frameworks et outils qui transforment le développement web moderne. React, Vue, Angular et les nouvelles technologies qui façonnent l'avenir du web.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop&crop=center",
        created_at: "2025-06-09T14:30:00Z",
        category: { id: 2, name: "Développement" },
        user: { id: 2, name: "Pierre Martin" },
        tags: [
            { id: 4, name: "Web" },
            { id: 5, name: "React" },
            { id: 6, name: "JavaScript" }
        ]
    },
    {
        id: 3,
        title: "Guide complet du design system moderne",
        content: "Un design system bien conçu est essentiel pour maintenir la cohérence d'une application. Voici comment créer et maintenir un design system efficace.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop&crop=center",
        created_at: "2025-06-08T09:15:00Z", 
        category: { id: 3, name: "Design" },
        user: { id: 3, name: "Sophie Laurent" },
        tags: [
            { id: 7, name: "UI/UX" },
            { id: 8, name: "Design" },
            { id: 9, name: "Système" }
        ]
    },
    {
        id: 4,
        title: "Laravel 11 : Les nouveautés à connaître",
        content: "Laravel 11 apporte de nombreuses améliorations et nouvelles fonctionnalités. Découvrez ce qui va changer votre façon de développer avec ce framework.",
        image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=200&fit=crop&crop=center",
        created_at: "2025-06-07T16:45:00Z",
        category: { id: 4, name: "PHP" },
        user: { id: 1, name: "Marie Dupont" },
        tags: [
            { id: 10, name: "Laravel" },
            { id: 11, name: "PHP" },
            { id: 12, name: "Backend" }
        ]
    },
    {
        id: 5,
        title: "Optimisation des performances React",
        content: "Apprenez les meilleures pratiques pour optimiser les performances de vos applications React. De la gestion d'état aux techniques de rendu avancées.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=center",
        created_at: "2025-06-06T11:20:00Z",
        category: { id: 2, name: "Développement" },
        user: { id: 2, name: "Pierre Martin" },
        tags: [
            { id: 5, name: "React" },
            { id: 13, name: "Performance" },
            { id: 14, name: "Optimisation" }
        ]
    },
    {
        id: 6,
        title: "Tailwind CSS vs autres frameworks CSS",
        content: "Comparaison approfondie de Tailwind CSS avec Bootstrap, Bulma et autres frameworks populaires. Quel est le meilleur choix pour votre projet ?",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&crop=center",
        created_at: "2025-06-05T13:10:00Z",
        category: { id: 3, name: "Design" },
        user: { id: 3, name: "Sophie Laurent" },
        tags: [
            { id: 15, name: "CSS" },
            { id: 16, name: "Tailwind" },
            { id: 17, name: "Framework" }
        ]
    }
];

export default function CompleteDemo() {
    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                            Site News
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
                            Votre source d'information sur la technologie et l'innovation
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                                Découvrir les articles
                            </button>
                            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-colors">
                                S'abonner à la newsletter
                            </button>
                        </div>
                    </div>
                </section>

                {/* Articles principaux */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            Articles à la une
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            {/* Article principal */}
                            <div className="lg:col-span-2">
                                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                                    <img 
                                        src={sampleArticles[0].image}
                                        alt={sampleArticles[0].title}
                                        className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="p-6 md:p-8">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
                                            {sampleArticles[0].category.name}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                            {sampleArticles[0].title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                                            {sampleArticles[0].content}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                                                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                                                        {sampleArticles[0].user.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {sampleArticles[0].user.name}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-500 dark:text-gray-500">
                                                {new Date(sampleArticles[0].created_at).toLocaleDateString('fr-FR')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Articles secondaires */}
                            {sampleArticles.slice(1, 3).map((article) => (
                                <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                    <img 
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="p-6">
                                        <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-3">
                                            {article.category.name}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                            {article.content}
                                        </p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Par {article.user.name}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-500">
                                                {new Date(article.created_at).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'short'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section Autres Articles avec animations GSAP */}
                <OtherArticlesSection articles={sampleArticles} />

                {/* Newsletter Section */}
                <section className="py-16 bg-indigo-50 dark:bg-indigo-950">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Restez informé
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Recevez nos derniers articles directement dans votre boîte mail
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Votre adresse email"
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                            />
                            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                                S'abonner
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
