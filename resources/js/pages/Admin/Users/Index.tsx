import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    newsletter_subscribed: boolean;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    roles: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gestion des utilisateurs', href: '/admin/users' },
];

export default function Index({ users, roles }: Props) {
    const handleRoleChange = (userId: number, newRole: string) => {
        router.patch(route('admin.users.change-role', userId), { role: newRole });
    };

    const handleNewsletterToggle = (userId: number) => {
        router.patch(route('admin.users.toggle-newsletter', userId));
    };

    const handleDelete = (userId: number, userName: string) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userName}" ?`)) {
            router.delete(route('admin.users.destroy', userId));
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'webmaster': return 'bg-blue-100 text-blue-800';
            case 'auteur': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des utilisateurs" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Gestion des Utilisateurs ({users?.total || 0})
                    </h1>
                    <Link
                        href={route('admin.users.create')}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        + Nouvel utilisateur
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
                    {users && users.data.length > 0 ? (
                        <>
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
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
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
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                        className={`text-xs font-semibold rounded-full px-3 py-1 border-0 cursor-pointer ${getRoleColor(user.role)}`}
                                                    >
                                                        {roles?.map((role) => (
                                                            <option key={role} value={role}>
                                                                {role}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleNewsletterToggle(user.id)}
                                                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full transition cursor-pointer ${
                                                            user.newsletter_subscribed 
                                                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {user.newsletter_subscribed ? '✅ Abonné' : '❌ Non abonné'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={route('admin.users.edit', user.id)}
                                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs hover:bg-blue-200 transition"
                                                        >
                                                            ✏️ Modifier
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(user.id, user.name)}
                                                            className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs hover:bg-red-200 transition"
                                                        >
                                                            🗑️ Supprimer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {users.last_page > 1 && (
                                <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        {users.current_page > 1 && (
                                            <Link
                                                href={route('admin.users', { page: users.current_page - 1 })}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Précédent
                                            </Link>
                                        )}
                                        {users.current_page < users.last_page && (
                                            <Link
                                                href={route('admin.users', { page: users.current_page + 1 })}
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Suivant
                                            </Link>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                Affichage de{' '}
                                                <span className="font-medium">{(users.current_page - 1) * users.per_page + 1}</span>{' '}
                                                à{' '}
                                                <span className="font-medium">
                                                    {Math.min(users.current_page * users.per_page, users.total)}
                                                </span>{' '}
                                                sur{' '}
                                                <span className="font-medium">{users.total}</span> utilisateurs
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                                <Link
                                                    key={page}
                                                    href={route('admin.users', { page })}
                                                    className={`px-3 py-1 rounded-md text-sm ${
                                                        page === users.current_page
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                >
                                                    {page}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Aucun utilisateur trouvé
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Commencez par créer votre premier utilisateur.
                            </p>
                            <Link
                                href={route('admin.users.create')}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                + Créer un utilisateur
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}