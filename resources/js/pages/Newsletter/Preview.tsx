import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

interface Article {
    id: number;
    title: string;
    content: string;
    user: { name: string };
    category: { name: string };
    created_at: string;
}

interface Props {
    articles: Article[];
    subject: string;
    message: string;
}

export default function Preview({ articles, subject, message }: Props) {
    return (
        <AppLayout>
            <Head title="Aperçu Newsletter" />
            
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-6">
                    <Link
                        href={route('newsletter.index')}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                        ← Retour à la newsletter
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">📧 Aperçu de la Newsletter</h1>
                    
                    {/* Simulation de l'email */}
                    <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                        {/* En-tête email */}
                        <div className="text-center border-b border-gray-200 pb-6 mb-6">
                            <h2 className="text-2xl font-bold text-indigo-600">📰 NewsZone</h2>
                            <p className="text-gray-600">Votre newsletter hebdomadaire</p>
                        </div>

                        {/* Sujet */}
                        <div className="mb-6">
                            <strong>Sujet :</strong> {subject}
                        </div>

                        {/* Message personnalisé */}
                        {message && (
                            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
                                <h3 className="font-semibold text-indigo-800 mb-2">💬 Message de l'équipe</h3>
                                <p className="text-indigo-700">{message}</p>
                            </div>
                        )}

                        {/* Articles */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">🔥 Derniers articles</h3>
                            
                            {articles.length > 0 ? (
                                <div className="space-y-4">
                                    {articles.map((article) => (
                                        <div key={article.id} className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-lg text-indigo-600 mb-2">
                                                {article.title}
                                            </h4>
                                            <div className="text-sm text-gray-500 mb-2">
                                                📅 {new Date(article.created_at).toLocaleDateString('fr-FR')} 
                                                • ✍️ {article.user.name}
                                                • 📂 {article.category.name}
                                            </div>
                                            <p className="text-gray-700 mb-3">
                                                {article.content.substring(0, 200)}...
                                            </p>
                                            <div className="text-indigo-600 font-medium">
                                                → Lire la suite
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Aucun article récent à afficher.
                                </p>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
                            <p>
                                <strong>NewsZone</strong> - Votre source d'information de confiance<br/>
                                Se désabonner | © {new Date().getFullYear()} Tous droits réservés
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}