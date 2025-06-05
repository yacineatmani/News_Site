import { Link } from '@inertiajs/react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-full border-t border-[#E3E3E0] py-6 text-sm text-[#706f6c] dark:border-[#3E3E3A] dark:text-[#A1A09A]">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-center">
                    &copy; {new Date().getFullYear()} <span className="font-medium text-[#1b1b18] dark:text-[#EDEDEC]">NewsZone</span>. Tous droits réservés.
                </p>
                <nav className="flex flex-wrap gap-4 justify-center">
                    <Link href={route('articles.index')} className="hover:underline">
                        Articles
                    </Link>
                    {/* <Link href={route('about')} className="hover:underline">
                        À propos
                    </Link>
                    <Link href={route('contact')} className="hover:underline">
                        Contact
                    </Link> */}
                    <a
                        href="https://github.com/ton-projet"
                        target="_blank"
                        className="hover:underline"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </nav>
            </div>
        </footer>
    );
}