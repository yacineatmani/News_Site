import React, { useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import gsap from 'gsap';

type Category = {
    id: number;
    name: string;
};

type PageProps = {
    categories: Category[];
    auth: { user?: { role: string } };
};

export default function Index() {
    const { categories, auth } = usePage<PageProps>().props;

    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            gsap.from(titleRef.current, { y: -50, opacity: 0, duration: 1 });
        }
    }, []);

    return (
        <AppLayout>
            <div className="py-6">
                <h1 ref={titleRef} className="text-2xl font-bold mb-4">Catégories</h1>
                {auth.user && ['admin', 'webmaster'].includes(auth.user.role) && (
                    <Link
                        href={route('categories.create')}
                        className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Créer une catégorie
                    </Link>
                )}
                <ul className="grid gap-2">
                    {categories.length === 0 ? (
                        <li className="text-gray-500">Aucune catégorie pour le moment.</li>
                    ) : (
                        categories.map(cat => (
                            <li key={cat.id} className="flex items-center gap-2 bg-white shadow rounded px-4 py-2">
                                <span>{cat.name}</span>
                                {auth.user && ['admin', 'webmaster'].includes(auth.user.role) && (
                                    <Link
                                        href={route('categories.edit', cat.id)}
                                        className="text-green-600 hover:underline ml-2"
                                    >
                                        ✏️
                                    </Link>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </AppLayout>
    );
}