import React, { useState } from 'react';
import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

interface Article {
    id: number;
    title: string;
    content: string;
    image?: string;
    user: { id: number; name: string };
    category: { id: number; name: string };
    tags: { id: number; name: string }[];
    created_at: string;
}

interface Comment {
    id: number;
    content: string;
    user: { id: number; name: string };
    created_at: string;
}

interface PageProps {
    article: Article;
    comments: Comment[];
    userLiked: boolean;
    likesCount: number;
    commentsCount: number;
    auth: { user?: { id: number; role: string; name: string } };
}

export default function Show() {
    const { article, comments, userLiked, likesCount, commentsCount, auth } = usePage<PageProps>().props;
    const [isLiking, setIsLiking] = useState(false);
    const [localLiked, setLocalLiked] = useState(userLiked);
    const [localLikesCount, setLocalLikesCount] = useState(likesCount);

    // Formulaire pour les commentaires
    const { data, setData, post, processing, errors, reset } = useForm({
        content: ''
    });

    const handleLike = async () => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        setIsLiking(true);
        
        // Optimistic update
        setLocalLiked(!localLiked);
        setLocalLikesCount(localLiked ? localLikesCount - 1 : localLikesCount + 1);

        try {
            await router.post(route('articles.like', article.id), {}, {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsLiking(false),
                onError: () => {
                    // Revert optimistic update on error
                    setLocalLiked(localLiked);
                    setLocalLikesCount(localLikesCount);
                }
            });
        } catch (error) {
            setIsLiking(false);
            // Revert optimistic update
            setLocalLiked(localLiked);
            setLocalLikesCount(localLikesCount);
        }
    };

    const handleComment = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        post(route('comments.store', article.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('content');
            }
        });
    };

    const handleDeleteComment = (commentId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
            router.delete(route('comments.destroy', commentId), {
                preserveScroll: true
            });
        }
    };

    const handleDeleteArticle = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            router.delete(route('articles.destroy', article.id));
        }
    };

    return (
        <AppLayout>
            <Head title={article.title} />
            
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                {/* En-tête avec navigation */}
                <div className="mb-6">
                    <Link
                        href={route('articles.index')}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-4 inline-flex items-center gap-2"
                    >
                        ← Retour aux articles
                    </Link>
                    
                    {/* Actions admin */}
                    {auth.user && (auth.user.id === article.user.id || ['admin', 'webmaster'].includes(auth.user.role)) && (
                        <div className="flex gap-4 mt-4">
                            <Link
                                href={route('articles.edit', article.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                            >
                                ✏️ Modifier
                            </Link>
                            <button
                                onClick={handleDeleteArticle}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
                            >
                                🗑️ Supprimer
                            </button>
                        </div>
                    )}
                </div>

                {/* Article principal */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {/* Image de l'article */}
                    {article.image && (
                        <div className="w-full h-96 overflow-hidden">
                            <img
                                src={article.image.startsWith('http') ? article.image : `/storage/${article.image}`}
                                alt={article.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Image+non+disponible';
                                }}
                            />
                        </div>
                    )}

                    <div className="p-8">
                        {/* Catégorie */}
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-semibold rounded-full">
                                {article.category.name}
                            </span>
                        </div>

                        {/* Titre */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {article.title}
                        </h1>

                        {/* Métadonnées */}
                        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-6">
                            <span>Par {article.user.name}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(article.created_at).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {article.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Contenu */}
                        <div className="prose dark:prose-invert max-w-none mb-8">
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {article.content}
                            </div>
                        </div>

                        {/* Actions Like et Partage */}
                        <div className="flex items-center justify-between py-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-6">
                                {/* Bouton Like */}
                                <button
                                    onClick={handleLike}
                                    disabled={isLiking}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                                        localLiked
                                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
                                    } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className={`text-lg ${isLiking ? 'animate-pulse' : ''}`}>
                                        {localLiked ? '❤️' : '🤍'}
                                    </span>
                                    <span>{localLikesCount} {localLikesCount <= 1 ? 'like' : 'likes'}</span>
                                </button>

                                {/* Compteur commentaires */}
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <span>💬</span>
                                    <span>{commentsCount} {commentsCount <= 1 ? 'commentaire' : 'commentaires'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Section Commentaires */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Commentaires ({commentsCount})
                    </h2>

                    {/* Formulaire de commentaire */}
                    {auth.user ? (
                        <form onSubmit={handleComment} className="mb-8">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ajouter un commentaire
                                </label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Partagez votre opinion..."
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {errors.content && (
                                    <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing || !data.content.trim()}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Publication...' : 'Publier le commentaire'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center mb-8">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Connectez-vous pour laisser un commentaire
                            </p>
                            <Link
                                href={route('login')}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Se connecter
                            </Link>
                        </div>
                    )}

                    {/* Liste des commentaires */}
                    <div className="space-y-6">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {comment.user.name}
                                                </span>
                                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                                    {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>
                                        
                                        {/* Bouton supprimer pour l'auteur ou admin */}
                                        {auth.user && (auth.user.id === comment.user.id || ['admin', 'webmaster'].includes(auth.user.role)) && (
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="text-red-600 hover:text-red-800 p-1 rounded transition"
                                                title="Supprimer le commentaire"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 dark:text-gray-400">
                                    Aucun commentaire pour le moment. Soyez le premier à commenter !
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}