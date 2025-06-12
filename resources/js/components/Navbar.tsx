import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/components/ThemeToggle';
import { type SharedData } from '@/types';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const role = typeof auth.user?.role === 'string' ? auth.user.role : '';

    return (
        <header className="w-full max-w-6xl mx-auto flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-6">
                <Link href={route('home')} className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    NewsZone
                </Link>
                <nav className="flex gap-6">
                    <Link
                        href={route('home')}
                        className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                        Accueil
                    </Link>
                    <Link
                        href={route('articles.index')}
                        className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                        Articles
                    </Link>
                    <Link
                        href={route('categories.index')}
                        className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                        Catégories
                    </Link>
                    {auth.user && ['auteur', 'webmaster', 'admin'].includes(role) && (
                        <Link
                            href={route('articles.create')}
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                            Publier un article
                        </Link>
                    )}
                    {auth.user && ['webmaster', 'admin'].includes(role) && (
                        <>
                            <Link
                                href={route('categories.create')}
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                                Créer une catégorie
                            </Link>
                            {/* ⭐ AJOUTER LE LIEN NEWSLETTER */}
                            <Link
                                href={route('newsletter.index')}
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                                Newsletter
                            </Link>
                        </>
                    )}
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex gap-2">
                    <ThemeToggle />
                </div>
                {auth.user ? (
                    <>
                        <Link
                            href={route('dashboard')}
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                            Tableau de bord
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                        >
                            Déconnexion
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
                        >
                            Connexion
                        </Link>
                        <Link
                            href={route('register')}
                            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
                        >
                            Inscription
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}