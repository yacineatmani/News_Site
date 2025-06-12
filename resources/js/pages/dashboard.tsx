import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Stats {
    total_articles: number;
    total_categories: number;
    total_users?: number;
    my_articles?: number;
    my_likes?: number;
    my_comments?: number;
    newsletter_subscribers?: number;
    users_by_role?: Record<string, number>;
    recent_users?: Array<{
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
    }>;
    all_users?: Array<{
        id: number;
        name: string;
        email: string;
        role: string;
        newsletter_subscribed: boolean;
        created_at: string;
    }>;
}

interface Props {
    stats: Stats;
    userRole: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { stats, userRole } = usePage<Props>().props;

    // Vérification de sécurité
    if (!stats || !userRole) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Tableau de bord" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">⏳</div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Chargement du tableau de bord...
                        </h2>
                    </div>
                </div>
            </AppLayout>
        );
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'webmaster': return 'bg-blue-100 text-blue-800';
            case 'auteur': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleDisplayName = (role: string) => {
        switch (role) {
            case 'admin': return 'Administrateur';
            case 'webmaster': return 'Webmaster';
            case 'auteur': return 'Auteur';
            default: return role;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />
            <div className="mb-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Tableau de bord - {getRoleDisplayName(userRole)}
    </h1>
    <p className="text-gray-600 dark:text-gray-400 mt-2">
        Bienvenue sur votre espace d'administration
    </p>
    {/* ⭐ Bouton retour accueil */}
    <a
        href="/"
        className="inline-block mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
    >
        ← Retour à l'accueil
    </a>
</div>
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* En-tête du dashboard */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Tableau de bord - {getRoleDisplayName(userRole)}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Bienvenue sur votre espace d'administration
                    </p>
                </div>

                {/* Statistiques principales */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Articles</p>
                                <p className="text-3xl font-bold text-indigo-600">{stats?.total_articles || 0}</p>
                            </div>
                            <div className="text-2xl">📰</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Catégories</p>
                                <p className="text-3xl font-bold text-green-600">{stats?.total_categories || 0}</p>
                            </div>
                            <div className="text-2xl">📂</div>
                        </div>
                    </div>

                    {stats?.total_users !== undefined && (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Utilisateurs</p>
                                    <p className="text-3xl font-bold text-blue-600">{stats.total_users}</p>
                                </div>
                                <div className="text-2xl">👥</div>
                            </div>
                        </div>
                    )}

                    {stats?.newsletter_subscribers !== undefined && (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Newsletter</p>
                                    <p className="text-3xl font-bold text-purple-600">{stats.newsletter_subscribers}</p>
                                </div>
                                <div className="text-2xl">📧</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Statistiques spécifiques aux auteurs */}
                {userRole === 'auteur' && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-6">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mes Articles</p>
                                    <p className="text-3xl font-bold text-indigo-600">{stats?.my_articles || 0}</p>
                                </div>
                                <div className="text-2xl">✍️</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Likes reçus</p>
                                    <p className="text-3xl font-bold text-red-600">{stats?.my_likes || 0}</p>
                                </div>
                                <div className="text-2xl">❤️</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Commentaires</p>
                                    <p className="text-3xl font-bold text-yellow-600">{stats?.my_comments || 0}</p>
                                </div>
                                <div className="text-2xl">💬</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Statistiques supplémentaires pour Webmaster */}
                {userRole === 'webmaster' && stats?.recent_articles && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mt-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Articles Récents
                        </h2>
                        <div className="space-y-3">
                            {stats.recent_articles.slice(0, 3).map((article: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">{article.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Par {article.user?.name} • {article.category?.name}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(article.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section principale - Gestion des utilisateurs pour Admin */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm flex-1">
                    {userRole === 'admin' && stats?.all_users && stats.all_users.length > 0 ? (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Gestion des Utilisateurs ({stats.all_users.length})
                                </h2>
                                <Link
                                    href={route('admin.users.create')}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                                >
                                    + Nouvel utilisateur
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Utilisateur
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Rôle
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Newsletter
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Inscription
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {stats.all_users.slice(0, 5).map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                                                        {getRoleDisplayName(user.role)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        user.newsletter_subscribed 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {user.newsletter_subscribed ? '✅ Abonné' : '❌ Non abonné'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('admin.users.edit', user.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        ✏️ Modifier
                                                    </Link>
                                                    <Link
                                                        href={route('admin.users')}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        👁️ Voir
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 text-center">
                                <Link
                                    href={route('admin.users')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition font-medium"
                                >
                                    Voir tous les utilisateurs →
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Actions rapides
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Link
                                    href={route('articles.create')}
                                    className="bg-indigo-600 text-white p-6 rounded-lg hover:bg-indigo-700 transition text-center group"
                                >
                                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">✍️</div>
                                    <h3 className="font-semibold text-lg mb-2">Publier un article</h3>
                                    <p className="text-indigo-100 text-sm">Créer un nouveau contenu</p>
                                </Link>

                                {(userRole === 'webmaster' || userRole === 'admin') && (
                                    <>
                                        <Link
                                            href={route('newsletter.index')}
                                            className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition text-center group"
                                        >
                                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📧</div>
                                            <h3 className="font-semibold text-lg mb-2">Newsletter</h3>
                                            <p className="text-purple-100 text-sm">Envoyer une newsletter</p>
                                        </Link>

                                        <Link
                                            href={route('categories.create')}
                                            className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition text-center group"
                                        >
                                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📂</div>
                                            <h3 className="font-semibold text-lg mb-2">Nouvelle catégorie</h3>
                                            <p className="text-green-100 text-sm">Organiser les contenus</p>
                                        </Link>
                                    </>
                                )}

                                {userRole === 'admin' && (
                                    <>
                                        <Link
                                            href={route('admin.users')}
                                            className="bg-red-600 text-white p-6 rounded-lg hover:bg-red-700 transition text-center group"
                                        >
                                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">👥</div>
                                            <h3 className="font-semibold text-lg mb-2">Gérer les utilisateurs</h3>
                                            <p className="text-red-100 text-sm">Administration complète</p>
                                        </Link>

                                        <Link
                                            href={route('admin.stats')}
                                            className="bg-yellow-600 text-white p-6 rounded-lg hover:bg-yellow-700 transition text-center group"
                                        >
                                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📊</div>
                                            <h3 className="font-semibold text-lg mb-2">Statistiques</h3>
                                            <p className="text-yellow-100 text-sm">Analyses détaillées</p>
                                        </Link>

                                        <Link
                                            href={route('articles.index')}
                                            className="bg-gray-600 text-white p-6 rounded-lg hover:bg-gray-700 transition text-center group"
                                        >
                                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📋</div>
                                            <h3 className="font-semibold text-lg mb-2">Tous les articles</h3>
                                            <p className="text-gray-100 text-sm">Modération et gestion</p>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}