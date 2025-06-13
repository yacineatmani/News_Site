import { useEffect, useState } from 'react';

type Appearance = 'light' | 'dark';

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>(() => {
        // Vérifier le localStorage au démarrage
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('appearance') as Appearance;
            if (stored) return stored;
        }
        // Forcer le mode light par défaut
        return 'light';
    });

    const updateAppearance = (newAppearance: Appearance) => {
        setAppearance(newAppearance);
        localStorage.setItem('appearance', newAppearance);
        
        // Appliquer la classe au document
        if (newAppearance === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        // Appliquer l'apparence initiale
        if (appearance === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [appearance]);

    return { appearance, updateAppearance };
}

// Fonction d'initialisation pour le thème (si nécessaire)
export function initializeTheme() {
    const theme = localStorage.getItem('appearance') || 'light';
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}
