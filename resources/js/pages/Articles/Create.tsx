import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

type ArticlePageProps = {
    categories: { id: number; name: string }[];
    tags: { id: number; name: string }[];
};

export default function Create() {
    const { categories, tags } = usePage<ArticlePageProps>().props;
    const { data, setData, post, errors, processing } = useForm<{
        title: string;
        content: string;
        image: File | null;
        category_id: string;
        tags: number[];
    }>({
        title: '',
        content: '',
        image: null,
        category_id: '',
        tags: [],
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('articles.store'), {
            forceFormData: true, // important pour envoyer un fichier !
        });
    }

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">Créer un article</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-[#23263a] p-6 rounded shadow">
                    <div>
                        <label className="block font-semibold mb-1">Titre</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="Titre"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Contenu</label>
                        <textarea
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            placeholder="Contenu"
                            className="w-full border rounded px-3 py-2 min-h-[120px]"
                        />
                        {errors.content && <div className="text-red-500 text-sm">{errors.content}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Catégorie</label>
                        <select
                            value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Choisir une catégorie</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <div className="text-red-500 text-sm">{errors.category_id}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Tags</label>
                        <div className="flex flex-wrap gap-3">
                            {tags.map(tag => (
                                <label key={tag.id} className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        value={tag.id}
                                        checked={data.tags.includes(tag.id)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setData('tags', [...data.tags, tag.id]);
                                            } else {
                                                setData('tags', data.tags.filter((id: number) => id !== tag.id));
                                            }
                                        }}
                                    />
                                    <span>{tag.name}</span>
                                </label>
                            ))}
                        </div>
                        {errors.tags && <div className="text-red-500 text-sm">{errors.tags}</div>}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                        >
                            Créer
                        </button>
                        <Link href={route('articles.index')} className="text-indigo-600 hover:underline">
                            Retour à la liste
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}