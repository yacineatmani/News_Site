import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

export default function Welcome() {
    return (
        <AppLayout>
            <Head title="Test - NewsZone" />
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-black mb-4">
                        🎉 NewsZone - Test
                    </h1>
                    <p className="text-xl text-gray-800 mb-8">
                        Si vous voyez ce texte, le composant fonctionne !
                    </p>
                    <div className="bg-indigo-600 text-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Zone de test</h2>
                        <p>Cette zone devrait être visible en bleu avec du texte blanc.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
