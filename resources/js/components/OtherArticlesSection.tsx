import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ArticleCard from './ArticleCard';
import type { Article } from '@/types/global';

interface OtherArticlesSectionProps {
    articles: Article[];
}

export default function OtherArticlesSection({ articles }: OtherArticlesSectionProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Animation d'entrée pour les cartes
        if (cardRefs.current.length > 0) {
            gsap.fromTo(
                cardRefs.current,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.1,
                }
            );
        }
    }, [articles]);

    if (!articles || articles.length <= 3) {
        return null;
    }

    return (
        <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Autres articles
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(3, 9).map((article, index) => (
                    <div
                        key={article.id}
                        ref={(el) => (cardRefs.current[index] = el)}
                    >
                        <ArticleCard article={article} index={index} />
                    </div>
                ))}
            </div>
        </section>
    );
}
