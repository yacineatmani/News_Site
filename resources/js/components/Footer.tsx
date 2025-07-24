import { Link } from '@inertiajs/react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12 text-sm text-gray-600 dark:text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            href="/articles"
                            className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                            Articles
                        </Link>
                        <Link
                            href="/categories"
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
        </footer>
    );
}