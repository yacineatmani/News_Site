import { Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Article } from '@/types/global';

interface ArticleCardProps {
    article: Article;
    index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleMouseEnter = () => {
        if (cardRef.current) {
            gsap.to(cardRef.current.querySelectorAll('.tag-card'), {
                opacity: 1,
                x: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(cardRef.current.querySelectorAll('.meta'), {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            gsap.to(cardRef.current.querySelectorAll('.tag-card'), {
                opacity: 0,
                x: -10,
                duration: 0.3,
            });
            gsap.to(cardRef.current.querySelectorAll('.meta'), {
                opacity: 0,
                y: 10,
                duration: 0.3,
            });
        }
    };

    return (        <div
            ref={cardRef}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={`/articles/${article.id}`} className="block">
                {article.image ? (
                    <img
                        src={article.image.startsWith('http') ? article.image : `/storage/${article.image}`}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+non+disponible';
                        }}
                    />
                ) : (
                    <div className="w-full h-48 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
                        <span className="text-indigo-500 text-4xl">📰</span>
                    </div>
                )}
                
                <div className="p-5">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                        {article.category.name}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-3 line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                        {article.content.substring(0, 120)}...
                    </p>
                    
                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag.id}
                                    className="tag-card text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full opacity-0 -translate-x-2"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div className="meta flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 opacity-0 translate-y-2">
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
    );
}
