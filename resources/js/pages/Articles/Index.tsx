import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

type Article = {
    id: number;
    title: string;
    user?: { id: number; name: string };
    category?: { id: number; name: string };
    tags?: { id: number; name: string }[];
    user_id?: number;
};

interface PageProps {
    articles: { data: Article[] };
    auth: { user?: { id: number; role: string } };
}

export default function Index() {
    const { articles, auth } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <div className="py-6">
                <h1 className="text-2xl font-bold mb-4">Articles</h1>
                {auth.user && ['auteur', 'admin', 'webmaster'].includes(auth.user.role) && (
                    <Link
                        href={route('articles.create')}
                        className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Créer un article
                    </Link>
                )}
                <div className="grid gap-4">
                    {articles.data.length === 0 ? (
                        <div className="text-gray-500">Aucun article pour le moment.</div>
                    ) : (
                        articles.data.map((article) => (
                            <div key={article.id} className="p-4 bg-white shadow rounded">
                                <Link
                                    href={route('articles.show', article.id)}
                                    className="text-xl font-semibold hover:text-blue-500"
                                >
                                    {article.title}
                                </Link>
                                <p className="text-gray-600">
                                    Par {article.user?.name ?? 'Inconnu'} | Catégorie : {article.category?.name ?? 'Aucune'}
                                </p>
                                <div className="flex space-x-2 mt-2">
                                    {(article.tags ?? []).map((tag) => (
                                        <span key={tag.id} className="px-2 py-1 bg-gray-200 text-sm rounded">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                                {auth.user && (['admin', 'webmaster'].includes(auth.user.role) || auth.user.id === article.user_id) && (
                                    <Link
                                        href={route('articles.edit', article.id)}
                                        className="text-blue-500 hover:underline ml-2"
                                    >
                                        Modifier
                                    </Link>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}