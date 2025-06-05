import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/components/ThemeToggle';
import AppearanceDropdown from '@/components/appearance-dropdown';
import AppearanceTabs from '@/components/appearance-tabs';
import { type SharedData } from '@/types';

export default function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="flex justify-between items-center py-4 mb-6 border-b">
            <nav className="flex gap-4">
                <Link href={route('articles.index')}>Articles</Link>
                <Link href={route('categories.index')}>Catégories</Link>
                {auth.user && (
                    <Link href={route('articles.create')}>Publier un article</Link>
                )}
            </nav>
            <div className="flex gap-2">
                <ThemeToggle />
                <AppearanceDropdown />
                <AppearanceTabs />
                {auth.user ? (
                    <Link href={route('dashboard')}>Tableau de bord</Link>
                ) : (
                    <>
                        <Link href={route('login')}>Connexion</Link>
                        <Link href={route('register')}>Inscription</Link>
                    </>
                )}
            </div>
        </header>
    );
}