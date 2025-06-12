import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

interface Article {
    id: number;
    title: string;
    content: string;
    image?: string;
    category_id?: number;
    tags?: { id: number; name: string }[];
}

interface PageProps {
    article: Article;
    categories: { id: number; name: string }[];
    tags: { id: number; name: string }[];
    auth: { user?: { id: number; role: string } };
    [key: string]: unknown;
}

export default function Edit() {
    const { article, categories, tags } = usePage<PageProps>().props;

    const { data, setData, post, errors, processing } = useForm({
        title: article.title || '',
        content: article.content || '',
        image: null as File | null,
        category_id: String(article.category_id || ''),
        tags: article.tags ? article.tags.map((t) => t.id) : [],
        _method: 'patch' // ⭐ IMPORTANT pour Laravel
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log('Données à envoyer:', data); // ⭐ DEBUG
        
        // ⭐ UTILISER POST au lieu de PUT pour les fichiers
        post(route('articles.update', article.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    return (
        <AppLayout>
            <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Modifier un article</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    {/* Image actuelle */}
                    <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        {article.image ? (
                            <img
                                src={article.image.startsWith('http') ? article.image : `/storage/${article.image}`}
                                alt={article.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/600x300?text=Image+non+disponible';
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                Aucune image disponible
                            </div>
                        )}
                    </div>
                    
                    {/* Nouvelle image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nouvelle image (optionnel)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">Laissez vide pour conserver l'image actuelle</p>
                        {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                    </div>
                    
                    {/* Titre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Titre *
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Titre de l'article"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                            required
                        />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>
                    
                    {/* Contenu */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contenu *
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Contenu de l'article"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 min-h-[150px]"
                            required
                        />
                        {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                    </div>
                    
                    {/* Catégorie */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Catégorie *
                        </label>
                        <select
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
                            required
                        >
                            <option value="">Choisir une catégorie</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                    </div>
                    
                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Tags (optionnel)
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag) => (
                                <label key={tag.id} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        value={tag.id}
                                        checked={data.tags.includes(tag.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setData('tags', [...data.tags, tag.id]);
                                            } else {
                                                setData('tags', data.tags.filter((id: number) => id !== tag.id));
                                            }
                                        }}
                                        className="h-4 w-4 text-indigo-600"
                                    />
                                    <span className="text-gray-700 dark:text-gray-200">{tag.name}</span>
                                </label>
                            ))}
                        </div>
                        {errors.tags && <div className="text-red-500 text-sm mt-1">{errors.tags}</div>}
                    </div>
                    
                    {/* Boutons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </button>
                        <Link
                            href={route('articles.index')}
                            className="inline-block px-6 py-3 text-indigo-600 hover:text-indigo-800 transition"
                        >
                            Retour à la liste
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}