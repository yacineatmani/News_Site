// Script pour initialiser le thème avant le rendu React
(function() {
    // Forcer le mode light par défaut
    const theme = localStorage.getItem('appearance') || 'light';
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // S'assurer que le body a un background par défaut
    document.documentElement.style.backgroundColor = theme === 'dark' ? '#111827' : '#ffffff';
})();
