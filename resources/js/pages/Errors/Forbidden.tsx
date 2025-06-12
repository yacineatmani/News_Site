import React from 'react';
import { Head } from '@inertiajs/react';

interface Props {
    message: string;
    your_role: string;
    required_roles: string[];
}

export default function Forbidden({ message, your_role, required_roles }: Props) {
    return (
        <>
            <Head title="Accès refusé" />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                    <div className="text-center">
                        <div className="text-6xl text-red-500 mb-4">🚫</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès refusé</h1>
                        <p className="text-gray-600 mb-4">{message}</p>
                        
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <p className="text-sm text-gray-700">
                                <strong>Votre rôle :</strong> {your_role}
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Rôles requis :</strong> {required_roles.join(', ')}
                            </p>
                        </div>
                        
                        <a 
                            href="/" 
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retour à l'accueil
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}