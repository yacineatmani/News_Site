import AppLayout from '@/layouts/AppLayout';

export default function SimpleTest() {
    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Test du nouveau layout
                    </h1>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Mode clair par défaut
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Cette page utilise le nouveau layout avec le système de thème dark/light.
                            Le mode clair est activé par défaut.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
                                    🎨 Système de thème
                                </h3>
                                <p className="text-blue-700 dark:text-blue-300">
                                    Utilisez le bouton en haut à droite pour basculer entre les modes clair et sombre.
                                </p>
                            </div>
                            
                            <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                                <h3 className="text-lg font-medium text-green-900 dark:text-green-100 mb-2">
                                    ✨ Animations GSAP
                                </h3>
                                <p className="text-green-700 dark:text-green-300">
                                    Le titre "Site News" dans la navbar utilise des animations SplitType + GSAP.
                                </p>
                            </div>
                            
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg">
                                <h3 className="text-lg font-medium text-purple-900 dark:text-purple-100 mb-2">
                                    🚀 Layout moderne
                                </h3>
                                <p className="text-purple-700 dark:text-purple-300">
                                    Layout responsive avec navbar sticky, animations fluides et support complet du dark mode.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <button 
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                            onClick={() => alert('Layout fonctionne parfaitement !')}
                        >
                            Tester l'interactivité
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
