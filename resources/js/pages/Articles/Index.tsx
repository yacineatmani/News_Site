import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

type Article = {
    id: number;
    title: string;
    content: string;
    image?: string;
    user: { id: number; name: string };
    category: { id: number; name: string };
    tags: { id: number; name: string }[];
    likes_count: number;
    comments_count: number;
    user_has_liked?: boolean;
    created_at: string;
};

interface PageProps {
    articles: { data: Article[] };
    auth: { user?: { id: number; role: string } };
    [key: string]: unknown;
}

export default function Index() {
    const { articles, auth } = usePage<PageProps>().props;
    const [isLoading, setIsLoading] = useState<number | null>(null);

    const handleLike = async (articleId: number) => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        setIsLoading(articleId);
        
        try {
            await router.post(route('articles.like', articleId), {}, {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsLoading(null)
            });
        } catch (error) {
            setIsLoading(null);
            console.error('Erreur lors du like:', error);
        }
    };

    const handleDelete = (articleId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            router.delete(route('articles.destroy', articleId));
        }
    };

    return (
        <AppLayout>
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Articles ({articles.data.length})
                    </h1>
                    {auth.user && ['auteur', 'admin', 'webmaster'].includes(auth.user.role) && (
                        <Link
                            href={route('articles.create')}
                            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:-translate-y-1"
                        >
                            ✍️ Créer un article
                        </Link>
                    )}
                </div>

                {articles.data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📰</div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Aucun article pour le moment
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Soyez le premier à publier un article !
                        </p>
                        {auth.user && ['auteur', 'admin', 'webmaster'].includes(auth.user.role) && (
                            <Link
                                href={route('articles.create')}
                                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                Publier le premier article
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.data.map((article) => (
                            <div
                                key={article.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition hover:shadow-lg hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 relative group">
                                    {article.image ? (
                                        <Link href={route('articles.show', article.id)}>
                                            <img
                                                src={article.image.startsWith('http') ? article.image : `/storage/${article.image}`}
                                                alt={article.title}
                                                className="w-full h-full object-cover rounded-t-xl group-hover:opacity-90 transition"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+non+disponible';
                                                }}
                                            />
                                        </Link>
                                    ) : (
                                        <Link href={route('articles.show', article.id)}>
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition">
                                                <span className="text-5xl">📰</span>
                                            </div>
                                        </Link>
                                    )}
                                    
                                    {/* Badge catégorie */}
                                    <div className="absolute top-2 left-2">
                                        <span className="inline-block px-2 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                                            {article.category.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Titre */}
                                    <Link
                                        href={route('articles.show', article.id)}
                                        className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition line-clamp-2 mb-3 block"
                                    >
                                        {article.title}
                                    </Link>

                                    {/* Extrait */}
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                        {article.content.substring(0, 150)}...
                                    </p>

                                    {/* Tags */}
                                    {article.tags && article.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {article.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full"
                                                >
                                                    #{tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Auteur et date */}
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <span>Par {article.user.name}</span>
                                        <span className="mx-2">•</span>
                                        <span>{new Date(article.created_at).toLocaleDateString('fr-FR')}</span>
                                    </div>

                                    {/* Actions : Likes, Commentaires, Admin */}
                                    <div className="flex items-center justify-between">
                                        {/* Likes et Commentaires */}
                                        <div className="flex items-center gap-4">
                                            {/* Bouton Like */}
                                            <button
                                                onClick={() => handleLike(article.id)}
                                                disabled={isLoading === article.id}
                                                className={`flex items-center gap-1 text-sm font-medium transition ${
                                                    article.user_has_liked
                                                        ? 'text-red-600 hover:text-red-700'
                                                        : 'text-gray-500 hover:text-red-600'
                                                } ${isLoading === article.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <span className={`transition-transform ${isLoading === article.id ? 'animate-pulse' : 'hover:scale-110'}`}>
                                                    {article.user_has_liked ? '❤️' : '🤍'}
                                                </span>
                                                <span>{article.likes_count}</span>
                                            </button>

                                            {/* Commentaires */}
                                            <Link
                                                href={route('articles.show', article.id)}
                                                className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-indigo-600 transition"
                                            >
                                                <span>💬</span>
                                                <span>{article.comments_count}</span>
                                            </Link>
                                        </div>

                                        {/* Actions Admin */}
                                        {auth.user && (['admin', 'webmaster'].includes(auth.user.role) || auth.user.id === article.user.id) && (
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('articles.edit', article.id)}
                                                    className="text-sm text-blue-600 hover:text-blue-800 p-1 rounded transition"
                                                    title="Modifier"
                                                >
                                                    ✏️
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    className="text-sm text-red-600 hover:text-red-800 p-1 rounded transition"
                                                    title="Supprimer"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}