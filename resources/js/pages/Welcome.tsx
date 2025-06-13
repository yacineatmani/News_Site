import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppLayout from '@/layouts/AppLayout';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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
    
    // Refs pour les animations GSAP
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const articlesRef = useRef<HTMLDivElement>(null);

    // Formulaire newsletter
    const { data, setData, post, processing, errors, reset } = useForm({
        email: ''
    });

    // Animations GSAP au montage du composant
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation du hero principal avec effet wow
            if (heroRef.current) {
                gsap.fromTo(heroRef.current, 
                    { 
                        opacity: 0, 
                        y: 100,
                        scale: 0.8
                    },
                    { 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                        duration: 1.5, 
                        ease: "power4.out",
                        delay: 0.3
                    }
                );
            }

            // Animation des features avec stagger élégant
            gsap.fromTo(".feature-card", 
                { 
                    opacity: 0, 
                    y: 50,
                    rotateX: -15,
                    scale: 0.9
                },
                { 
                    opacity: 1, 
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 1, 
                    ease: "back.out(1.7)",
                    stagger: 0.15,
                    delay: 0.8
                }
            );

            // Animation des éléments flottants
            gsap.to(".floating-element", {
                y: -30,
                duration: 4,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1,
                stagger: 0.5
            });

            // Animation des particules
            gsap.to(".particle", {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                duration: "random(3, 6)",
                ease: "none",
                repeat: -1,
                yoyo: true,
                stagger: 0.1
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Fonction pour gérer la suppression d'articles
    function handleDelete(articleId: number) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            router.delete(route('articles.destroy', articleId));
        }
    }

    // Fonction pour la soumission newsletter
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('newsletter.subscribe'), {
            onSuccess: () => {
                reset('email');
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Bienvenue sur NewsZone">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-hidden relative">
                {/* Particules d'arrière-plan */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="particle absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                {/* Éléments décoratifs flottants */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-2xl"></div>
                    <div className="floating-element absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
                    <div className="floating-element absolute bottom-40 left-1/4 w-36 h-36 bg-gradient-to-br from-indigo-400/25 to-purple-400/25 rounded-full blur-2xl"></div>
                    <div className="floating-element absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-full blur-xl"></div>
                </div>

                {/* Container principal */}
                <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
                    {/* Section Hero */}
                    <section ref={heroRef} className="w-full max-w-7xl mx-auto py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Contenu texte */}
                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full">
                                        <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">✨ Plateforme d'actualités moderne</span>
                                    </div>
                                    
                                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                                            NewsZone
                                        </span>
                                        <br />
                                        <span className="text-gray-900 dark:text-white">
                                            Révolutionnaire
                                        </span>
                                    </h1>
                                    
                                    <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light max-w-2xl">
                                        Découvrez, publiez et partagez l'actualité qui vous passionne avec une interface moderne et intuitive.
                                    </p>
                                </div>
                                
                                {/* Boutons d'action */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={route(auth.user ? 'dashboard' : 'register')}
                                        className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 text-lg overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative flex items-center">
                                            <span className="mr-3 text-2xl group-hover:animate-bounce">🚀</span>
                                            {auth.user ? 'Mon Dashboard' : 'Commencer maintenant'}
                                        </span>
                                    </Link>
                                    
                                    {!auth.user && (
                                        <Link
                                            href={route('login')}
                                            className="group inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 text-lg backdrop-blur-sm"
                                        >
                                            <span className="mr-3 text-2xl group-hover:animate-pulse">👋</span>
                                            Se connecter
                                        </Link>
                                    )}
                                </div>
                            </div>
                            
                            {/* Illustration moderne */}
                            <div className="relative flex items-center justify-center">
                                <div className="relative">
                                    {/* Carte principale */}
                                    <div className="relative w-96 h-96 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-700 hover:scale-105">
                                        <div className="absolute inset-6 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center">
                                            <div className="text-center text-white">
                                                <div className="text-6xl mb-6 animate-pulse">📰</div>
                                                <div className="text-2xl font-bold mb-3 tracking-wide">NewsZone</div>
                                                <div className="text-lg opacity-90 font-light">React × Laravel</div>
                                            </div>
                                        </div>
                                        
                                        {/* Indicateurs de données */}
                                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">{articles.length}</span>
                                        </div>
                                        
                                        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-xl flex items-center justify-center">
                                            <span className="text-white font-bold">📊</span>
                                        </div>
                                    </div>
                                    
                                    {/* Éléments flottants autour */}
                                    <div className="floating-element absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full shadow-lg"></div>
                                    <div className="floating-element absolute -bottom-4 right-8 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section Features */}
                    <section ref={featuresRef} className="w-full max-w-7xl mx-auto py-20">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Fonctionnalités 
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Exceptionnelles</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Une plateforme complète avec tout ce dont vous avez besoin pour créer, partager et découvrir du contenu de qualité
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="feature-card group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 shadow-xl hover:shadow-2xl">
                                <div className="text-5xl mb-6 group-hover:animate-bounce">📝</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Publication Facile</h3>
                                <p className="text-gray-600 dark:text-gray-300">Créez et publiez vos articles en quelques clics avec notre éditeur intuitif</p>
                            </div>
                            
                            <div className="feature-card group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 shadow-xl hover:shadow-2xl">
                                <div className="text-5xl mb-6 group-hover:animate-spin">⚡</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Performance Ultra</h3>
                                <p className="text-gray-600 dark:text-gray-300">Interface moderne avec React et Laravel pour une expérience ultra-rapide</p>
                            </div>
                            
                            <div className="feature-card group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 shadow-xl hover:shadow-2xl">
                                <div className="text-5xl mb-6 group-hover:animate-pulse">💬</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Interaction Sociale</h3>
                                <p className="text-gray-600 dark:text-gray-300">Commentaires, likes et partages pour une communauté engagée</p>
                            </div>
                            
                            <div className="feature-card group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 shadow-xl hover:shadow-2xl">
                                <div className="text-5xl mb-6 group-hover:animate-bounce">📧</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Newsletter Smart</h3>
                                <p className="text-gray-600 dark:text-gray-300">Système de newsletter automatisé pour rester connecté avec votre audience</p>
                            </div>
                        </div>
                    </section>

                    {/* Section Articles */}
                    {articles.length > 0 && (
                        <section ref={articlesRef} className="w-full max-w-7xl mx-auto py-20">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                    📰 Derniers Articles
                                </h2>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                    Découvrez les actualités les plus récentes
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {articles.slice(0, 6).map((article, index) => (
                                    <article key={article.id} className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl overflow-hidden border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 shadow-xl hover:shadow-2xl">
                                        <div className="relative h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                                            {article.image ? (
                                                <img 
                                                    src={article.image.startsWith('http') ? article.image : `/storage/${article.image}`}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-6xl">📰</span>
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 font-bold rounded-full text-sm">
                                                    {article.category.name}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {article.title}
                                            </h3>
                                            
                                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                                {article.content.substring(0, 150)}...
                                            </p>
                                            
                                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                <span>Par {article.user.name}</span>
                                                <div className="flex items-center gap-4">
                                                    <span>❤️ {article.likes_count}</span>
                                                    <span>💬 {article.comments_count}</span>
                                                </div>
                                            </div>
                                            
                                            <Link
                                                href={route('articles.show', article.id)}
                                                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                                            >
                                                Lire la suite 
                                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            
                            {articles.length > 6 && (
                                <div className="text-center mt-12">
                                    <Link
                                        href={route('articles.index')}
                                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                                    >
                                        Voir tous les articles
                                        <span className="ml-3 text-xl">📚</span>
                                    </Link>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Section Newsletter */}
                    <section className="w-full max-w-7xl mx-auto py-20">
                        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[3rem] overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                            
                            <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
                                <div className="max-w-4xl mx-auto">
                                    <div className="text-8xl mb-8 animate-bounce">📧</div>
                                    
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
                                        Restez Connecté
                                    </h2>
                                    
                                    <p className="text-xl lg:text-2xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                                        Recevez nos derniers articles et analyses exclusives directement dans votre boîte mail
                                    </p>
                                    
                                    <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto mb-8">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="Votre adresse email"
                                                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none transition-all duration-300 shadow-lg border-0 text-lg font-medium"
                                                required
                                            />
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 text-lg"
                                            >
                                                {processing ? 'Envoi...' : "S'abonner"}
                                            </button>
                                        </div>
                                        {errors.email && (
                                            <p className="mt-4 text-red-200 text-sm">{errors.email}</p>
                                        )}
                                    </form>
                                    
                                    <p className="text-purple-200 text-sm">
                                        Plus de 10,000 lecteurs nous font déjà confiance
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
