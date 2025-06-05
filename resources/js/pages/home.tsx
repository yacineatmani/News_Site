import { Head, Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/components/ThemeToggle';
import AppearanceDropdown from '@/components/appearance-dropdown';
import AppearanceTabs from '@/components/appearance-tabs';
import { type SharedData } from '@/types';

type DemoArticle = {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    image?: string;
};

const demoArticles: DemoArticle[] = [
    {
        id: 1,
        title: "L'IA révolutionne le journalisme",
        excerpt: "Découvrez comment l'intelligence artificielle transforme la rédaction et la diffusion de l'information.",
        category: "Tech",
        author: "Alice Dupont",
        image: undefined, // Ajoutez une image si vous le souhaitez, sinon laissez undefined
    },
    {
        id: 2,
        title: "Euro 2024 : les Bleus favoris ?",
        excerpt: "Analyse des chances de l'équipe de France pour le prochain championnat d'Europe de football.",
        category: "Sport",
        author: "Jean Martin",
        image: undefined,
    },
    {
        id: 3,
        title: "Musique : les tendances 2025",
        excerpt: "Quels genres et artistes vont marquer l'année à venir ?",
        category: "Culture",
        author: "Sophie Bernard",
        image: undefined,
    },
];

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bienvenue sur NewsZone">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#F5F7FA] p-6 text-[#1b1b18] dark:bg-[#181A20] dark:text-[#EDEDEC]">
                {/* Boutons thème */}
                <div className="w-full flex justify-end mb-4 gap-2">
                    <ThemeToggle />
                    <AppearanceDropdown />
                    <AppearanceTabs />
                </div>

                {/* Navigation principale */}
                <nav className="w-full max-w-4xl flex justify-end gap-4 mb-8">
                    <Link href={route('articles.index')} className="hover:underline text-indigo-700 dark:text-indigo-300">Articles</Link>
                    <Link href={route('categories.index')} className="hover:underline text-indigo-700 dark:text-indigo-300">Catégories</Link>
                    {auth.user && (
                        <Link href={route('articles.create')} className="hover:underline text-indigo-700 dark:text-indigo-300">Publier</Link>
                    )}
                    {auth.user ? (
                        <Link href={route('dashboard')} className="hover:underline text-indigo-700 dark:text-indigo-300">Tableau de bord</Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="hover:underline text-indigo-700 dark:text-indigo-300">Connexion</Link>
                            <Link href={route('register')} className="hover:underline text-indigo-700 dark:text-indigo-300">Inscription</Link>
                        </>
                    )}
                </nav>

                {/* Présentation */}
                <main className="flex flex-col lg:flex-row items-center w-full max-w-4xl bg-white dark:bg-[#23263a] rounded-lg shadow-lg p-8 mb-10">
                    <div className="flex-1 mb-8 lg:mb-0 lg:mr-8">
                        <h1 className="text-4xl font-extrabold mb-3 text-indigo-800 dark:text-indigo-200">
                            NewsZone&nbsp;
                            <span className="text-indigo-500 dark:text-indigo-400">: l’info qui compte</span>
                        </h1>
                        <p className="mb-4 text-[#4B5563] dark:text-[#A1A09A] text-lg">
                            Publiez, lisez et partagez l’actualité sur le thème de votre choix. Plateforme moderne, rapide et collaborative.
                        </p>
                        <ul className="mb-6 space-y-1 text-base">
                            <li>📰 Lire et commenter les articles</li>
                            <li>✍️ Publier vos propres contenus (si auteur)</li>
                            <li>📊 Interface admin complète (webmaster/admin)</li>
                            <li>📬 Recevoir et envoyer des newsletters</li>
                        </ul>
                        <div className="flex gap-4">
                            <Link
                                href={route(auth.user ? 'dashboard' : 'register')}
                                className="rounded bg-indigo-600 text-white px-6 py-2 font-semibold shadow hover:bg-indigo-700 transition"
                            >
                                {auth.user ? 'Tableau de bord' : 'Créer un compte'}
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={route('login')}
                                    className="rounded border border-indigo-300 px-6 py-2 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-200 dark:hover:bg-indigo-900 transition"
                                >
                                    Se connecter
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        {/* Illustration ou image */}
                        <div className="w-64 h-64 bg-gradient-to-br from-indigo-100 to-indigo-300 dark:from-indigo-900 dark:to-indigo-700 rounded-lg flex items-center justify-center shadow-inner">
                            <span className="text-2xl font-semibold text-indigo-700 dark:text-indigo-200 text-center">
                                News.<br />React.<br />Laravel.
                            </span>
                        </div>
                    </div>
                </main>

                {/* Exemples d’articles récents */}
                <section className="w-full max-w-4xl">
                    <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">À la une</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {demoArticles.map(article => (
        <div key={article.id} className="bg-white dark:bg-[#23263a] rounded-lg shadow flex flex-col overflow-hidden">
            {/* Affiche l'image si elle existe */}
            {article.image && (
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                />
            )}
            <div className="p-5 flex flex-col flex-1">
                <span className="text-xs uppercase text-indigo-500 font-semibold mb-2">{article.category}</span>
                <h3 className="text-lg font-bold mb-1 text-indigo-800 dark:text-indigo-100">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 flex-1">{article.excerpt}</p>
                <span className="text-sm text-gray-400 dark:text-gray-500">Par {article.author}</span>
            </div>
        </div>
    ))}
</div>
                </section>
            </div>
        </>
    );
}