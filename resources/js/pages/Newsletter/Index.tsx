import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { type SharedData } from '@/types';

interface NewsletterSubscription {
    id: number;
    email: string;
    is_active: boolean;
    subscribed_at: string;
    user?: {
        id: number;
        name: string;
    };
}

interface PageProps extends SharedData {
    subscriptions?: {
        data: NewsletterSubscription[];
        links: any[];
        meta: any;
    };
    stats?: {
        total_subscriptions: number;
        active_subscriptions: number;
        inactive_subscriptions: number;
        recent_subscriptions: number;
    };
}

export default function NewsletterIndex() {
    const props = usePage<PageProps>().props;
    
    // ⭐ VÉRIFICATIONS AVEC VALEURS PAR DÉFAUT
    const subscriptions = props.subscriptions || {
        data: [],
        meta: { total: 0 },
        links: []
    };
    
    const stats = props.stats || {
        total_subscriptions: 0,
        active_subscriptions: 0,
        inactive_subscriptions: 0,
        recent_subscriptions: 0
    };

    console.log('Newsletter props:', props); // ⭐ DEBUG

    return (
        <AppLayout>
            <Head title="Gestion Newsletter" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📧 Gestion Newsletter
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Gérez les abonnements et envoyez des newsletters
                        </p>
                    </div>

                    {/* Statistiques */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {stats.total_subscriptions}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total abonnements
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {stats.active_subscriptions}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Abonnements actifs
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {stats.inactive_subscriptions}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Désabonnements
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {stats.recent_subscriptions}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Cette semaine
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-6">
                        <Link
                            href="#"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            📋 Prévisualiser Newsletter
                        </Link>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            📤 Envoyer Newsletter
                        </button>
                    </div>

                    {/* Liste des abonnements */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Abonnements ({subscriptions.meta?.total || 0})
                            </h2>
                        </div>
                        
                        {subscriptions.data && subscriptions.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Utilisateur
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Statut
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Date d'inscription
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {subscriptions.data.map((subscription) => (
                                            <tr key={subscription.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {subscription.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {subscription.user?.name || 'Non connecté'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        subscription.is_active 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                        {subscription.is_active ? '✅ Actif' : '❌ Inactif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(subscription.subscribed_at).toLocaleDateString('fr-FR')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-6 text-center">
                                <div className="text-6xl mb-4">📧</div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Aucun abonnement pour le moment
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Les abonnements à la newsletter apparaîtront ici.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}