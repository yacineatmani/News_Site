import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// ⭐ UTILISER AppLayout au lieu de Footer
import AppLayout from '@/layouts/AppLayout';

interface Article {
    id: number;
    title: string;
    content: string;
    image?: string;
    user: { id: number; name: string };
    category: { id: number; name: string };
    tags: { id: number; name: string }[];
    likes_count: number;
    comments_count: number;
    created_at: string;
}

interface PageProps extends SharedData {
    articles: Article[];
}

export default function Welcome() {
    const { auth, articles } = usePage<PageProps>().props;
    const role = typeof auth.user?.role === 'string' ? auth.user.role : '';
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Formulaire newsletter
    const { data, setData, post, processing, errors, reset } = useForm({
        email: ''
    });

    function handleDelete(articleId: number) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            router.delete(route('articles.destroy', articleId));
        }
    }

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('newsletter.subscribe'), {
            onSuccess: () => {
                reset('email');
            }
        });
    };

    // GSAP Animation améliorée
    useEffect(() => {
        if (articles.length > 0 && slideRefs.current[currentSlide] && textRefs.current[currentSlide]) {
            const tl = gsap.timeline();
            tl.fromTo(
                slideRefs.current[currentSlide],
                { opacity: 0, scale: 0.95, x: 50 },
                { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: 'power2.out' }
            ).fromTo(
                textRefs.current[currentSlide],
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 },
                '-=0.4'
            );
        }
    }, [currentSlide, articles.length]);

    // Fonctions pour le carrousel
    const nextSlide = () => {
        if (articles.length > 0) {
            setCurrentSlide((prev) => (prev + 1) % articles.length);
        }
    };

    const prevSlide = () => {
        if (articles.length > 0) {
            setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
        }
    };

    // Auto-rotation avec pause
    useEffect(() => {
        if (!isPaused && articles.length > 1) {
            const interval = setInterval(nextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [isPaused, articles.length]);

    return (
        <AppLayout>
            <Head title="Bienvenue sur NewsZone">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* ⭐ CONTENU SANS NAVBAR NI FOOTER - AppLayout s'en charge */}
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
                {/* Container principal avec padding */}
                <div className="flex flex-col items-center p-6">
                    {/* Section principale */}
                    <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                                NewsZone <span className="text-indigo-600 dark:text-indigo-400">: l'info qui compte</span>
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Publiez, lisez et partagez l'actualité sur vos sujets préférés. Une plateforme moderne, rapide et collaborative.
                            </p>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-2">📰 Lire et commenter les articles</li>
                                <li className="flex items-center gap-2">✍️ Publier vos propres contenus</li>
                                <li className="flex items-center gap-2">📊 Interface admin complète</li>
                                <li className="flex items-center gap-2">📬 Recevoir et envoyer des newsletters</li>
                            </ul>
                            <div className="flex gap-4">
                                <Link
                                    href={route(auth.user ? 'dashboard' : 'register')}
                                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition transform hover:-translate-y-1"
                                >
                                    {auth.user ? 'Tableau de bord' : 'Créer un compte'}
                                </Link>
                                {!auth.user && (
                                    <Link
                                        href={route('login')}
                                        className="inline-block border border-indigo-600 text-indigo-600 dark:text-indigo-300 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900 transition transform hover:-translate-y-1"
                                    >
                                        Se connecter
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-80 h-80 bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 rounded-xl shadow-lg flex items-center justify-center transform rotate-3">
                                <span className="text-3xl font-bold text-white text-center">
                                    News.<br />React.<br />Laravel.
                                </span>
                            </div>
                        </div>
                    </main>

                    {/* Carrousel amélioré */}
                    <section className="w-full max-w-6xl mx-auto mb-12">
                        <div className="flex justify-between items-center mb-6 px-4 sm:px-6">
                            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">À la une</h2>
                            <Link
                                href={route('articles.index')}
                                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                Voir tous les articles →
                            </Link>
                        </div>

                        {articles && articles.length > 0 ? (
                            <div
                                className="relative"
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                            >
                                {/* Carrousel */}
                                <div className="overflow-hidden rounded-xl">
                                    <div className="flex">
                                        {articles.map((article, index) => (
                                            <div
                                                key={article.id}
                                                ref={(el) => { slideRefs.current[index] = el; }}
                                                className={`min-w-full transition-opacity duration-300 ${currentSlide === index ? 'block' : 'hidden'}`}
                                            >
                                                <Link href={route('articles.show', article.id)}>
                                                    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group">
                                                        {/* Image avec lazy loading */}
                                                        {article.image ? (
                                                            <img
                                                                src={article.image.startsWith('http') ? article.image : `/storage/${article.image}`}
                                                                alt={article.title}
                                                                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                                                                loading="lazy"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = 'https://via.placeholder.com/1200x600?text=Image+non+disponible';
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-96 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
                                                                <span className="text-indigo-500 text-6xl">📰</span>
                                                            </div>
                                                        )}
                                                        {/* Overlay avec texte */}
                                                        <div
                                                            ref={(el) => { textRefs.current[index] = el; }}
                                                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8"
                                                        >
                                                            <span className="inline-block text-xs font-semibold text-indigo-300 uppercase mb-2">
                                                                {article.category.name}
                                                            </span>
                                                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 line-clamp-2">
                                                                {article.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-200 line-clamp-3 mb-4">
                                                                {article.content.substring(0, 150)}...
                                                            </p>
                                                            {/* Tags */}
                                                            {article.tags && article.tags.length > 0 && (
                                                                <div className="flex flex-wrap gap-2 mb-4">
                                                                    {article.tags.slice(0, 3).map((tag) => (
                                                                        <span
                                                                            key={tag.id}
                                                                            className="text-xs bg-indigo-600/80 text-white px-2 py-1 rounded-full"
                                                                        >
                                                                            {tag.name}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-4 text-xs text-gray-300">
                                                                    <span>❤️ {article.likes_count}</span>
                                                                    <span>💬 {article.comments_count}</span>
                                                                    <span>Par {article.user.name}</span>
                                                                </div>
                                                                <span className="text-xs text-gray-400">
                                                                    {new Date(article.created_at).toLocaleDateString('fr-FR', {
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                        year: 'numeric',
                                                                    })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                {/* Actions admin */}
                                                {auth.user &&
                                                    (auth.user.id === article.user.id || ['admin', 'webmaster'].includes(role)) && (
                                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Link
                                                                href={route('articles.edit', article.id)}
                                                                className="text-sm text-white bg-blue-600/80 hover:bg-blue-600 p-2 rounded-full transition"
                                                            >
                                                                ✏️
                                                            </Link>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleDelete(article.id);
                                                                }}
                                                                className="text-sm text-white bg-red-600/80 hover:bg-red-600 p-2 rounded-full transition"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Navigation et indicateurs */}
                                {articles.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition backdrop-blur-sm"
                                            aria-label="Article précédent"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition backdrop-blur-sm"
                                            aria-label="Article suivant"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        <div className="flex justify-center gap-2 mt-6">
                                            {articles.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentSlide(index)}
                                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                        currentSlide === index ? 'bg-indigo-600 scale-125' : 'bg-gray-300 hover:bg-indigo-400'
                                                    }`}
                                                    aria-label={`Aller au slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    Aucun article publié pour le moment.
                                </p>
                                {auth.user && ['auteur', 'webmaster', 'admin'].includes(role) && (
                                    <Link
                                        href={route('articles.create')}
                                        className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                                    >
                                        Publier le premier article
                                    </Link>
                                )}
                            </div>
                        )}
                    </section>

                    {/* Section articles en grille */}
                    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-12">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Autres articles</h2>
                        {articles && articles.length > 3 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.slice(3, 9).map((article) => (
                                    <div
                                        key={article.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
                                    >
                                        <Link href={route('articles.show', article.id)}>
                                            {article.image ? (
                                                <img
                                                    src={article.image.startsWith('http') ? article.image : `/storage/${article.image}`}
                                                    alt={article.title}
                                                    className="w-full h-40 object-cover hover:opacity-90 transition"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+non+disponible';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-40 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
                                                    <span className="text-indigo-500 text-4xl">📰</span>
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
                                                    {article.category.name}
                                                </span>
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                                    {article.content.substring(0, 100)}...
                                                </p>
                                                <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <span>Par {article.user.name}</span>
                                                    <span>
                                                        {new Date(article.created_at).toLocaleDateString('fr-FR', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* ⭐ SECTION NEWSLETTER - GARDÉE TELLE QUELLE */}
                    <section className="w-full bg-indigo-600 dark:bg-indigo-800 py-16 rounded-xl mb-12">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                            <div className="text-white">
                                <div className="text-6xl mb-4">📧</div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Restez informé avec notre Newsletter
                                </h2>
                                <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                                    Recevez nos derniers articles, analyses exclusives et actualités directement dans votre boîte mail. 
                                    Ne manquez plus aucune information importante !
                                </p>
                                
                                <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto mb-6">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Votre adresse email"
                                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none transition"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                        >
                                            {processing ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Inscription...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    📧 S'abonner
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-200 text-sm mt-2 text-left">{errors.email}</p>
                                    )}
                                </form>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-indigo-100 mb-6">
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-2xl">🎯</span>
                                        <span className="text-sm">Contenu sélectionné</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-2xl">⚡</span>
                                        <span className="text-sm">Livraison hebdomadaire</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-2xl">🔒</span>
                                        <span className="text-sm">Désinscription facile</span>
                                    </div>
                                </div>
                                
                                <p className="text-indigo-200 text-sm max-w-lg mx-auto">
                                    💡 <strong>Note :</strong> Vous devez avoir un compte NewsZone pour vous abonner à notre newsletter.
                                    {!auth.user && (
                                        <>
                                            {' '}<Link 
                                                href={route('register')} 
                                                className="underline hover:text-white transition"
                                            >
                                                Créez votre compte gratuitement ici
                                            </Link>.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}