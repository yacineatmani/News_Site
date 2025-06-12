import { Link, router } from '@inertiajs/react';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleNewsletterSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        setIsSubscribing(true);
        router.post('/newsletter/subscribe', { email }, {
            onFinish: () => {
                setIsSubscribing(false);
                setEmail('');
            }
        });
    };

    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12 text-sm text-gray-600 dark:text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Newsletter Section */}
                <div className="mb-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        📧 Restez informé avec notre newsletter
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Recevez les dernières actualités directement dans votre boîte mail
                    </p>
                    <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Votre email"
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubscribing}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2"
                        >
                            <FaEnvelope className="w-4 h-4" />
                            {isSubscribing ? 'Inscription...' : 'S\'abonner'}
                        </button>
                    </form>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Copyright */}
                        <div className="text-center md:text-left">
                            <p className="mb-2">
                                © {new Date().getFullYear()} <span className="font-semibold text-gray-900 dark:text-white">NewsZone</span>. Tous droits réservés.
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                Votre source d'information de confiance
                            </p>
                        </div>

                        {/* Navigation */}
                        <nav className="flex flex-wrap gap-6 justify-center items-center">
                            <Link
                                href={route('articles.index')}
                                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                                Articles
                            </Link>
                            <Link
                                href={route('categories.index')}
                                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                                Catégories
                            </Link>
                            
                            {/* Social Links */}
                            <div className="flex gap-4 ml-4">
                                <a
                                    href="https://github.com/votre-projet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                                    title="GitHub"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://twitter.com/votre-projet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                                    title="Twitter"
                                >
                                    <FaTwitter className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://linkedin.com/company/votre-projet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                                    title="LinkedIn"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}