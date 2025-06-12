<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\NewsletterSubscribed;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    // ⭐ MÉTHODE INDEX POUR L'ADMIN
    public function index()
    {
        $subscribers = User::where('newsletter_subscribed', true)->get();
        $stats = [
            'total_subscribers' => $subscribers->count(),
            'total_users' => User::count(),
        ];
        
        return inertia('Newsletter/Index', [
            'subscribers' => $subscribers,
            'stats' => $stats
        ]);
    }

    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            // Créer un utilisateur temporaire pour la newsletter ou utiliser une table séparée
            // Pour l'instant, on crée un utilisateur basique
            $user = User::create([
                'name' => 'Abonné Newsletter',
                'email' => $request->email,
                'password' => bcrypt('temp-password-' . time()),
                'role' => 'auteur',
                'newsletter_subscribed' => true,
                'email_verified_at' => now()
            ]);
            
            try {
                Mail::to($user->email)->send(new NewsletterSubscribed($user));
                \Log::info('Email newsletter envoyé à: ' . $user->email);
            } catch (\Exception $e) {
                \Log::error('Erreur email newsletter: ' . $e->getMessage());
            }
            
            return back()->with('success', 'Inscription à la newsletter confirmée ! Vérifiez votre email.');
        }

        if ($user->newsletter_subscribed) {
            return back()->with('info', 'Vous êtes déjà inscrit à la newsletter !');
        }

        // Mettre à jour la colonne
        $user->update(['newsletter_subscribed' => true]);

        // Envoyer l'email de confirmation
        try {
            Mail::to($user->email)->send(new NewsletterSubscribed($user));
            \Log::info('Email newsletter envoyé à: ' . $user->email);
        } catch (\Exception $e) {
            \Log::error('Erreur email newsletter: ' . $e->getMessage());
            // On continue même si l'email échoue
        }

        return back()->with('success', 'Inscription à la newsletter confirmée !');
    }

    public function unsubscribe($encodedEmail)
    {
        $email = base64_decode($encodedEmail);
        $user = User::where('email', $email)->first();
        
        if ($user) {
            $user->update(['newsletter_subscribed' => false]);
            return redirect()->route('home')->with('success', 'Désinscription réussie');
        }
        
        return redirect()->route('home')->with('error', 'Email non trouvé');
    }

    // ⭐ MÉTHODES POUR L'ADMIN
    public function preview()
    {
        // Aperçu de la newsletter
        return inertia('Newsletter/Preview');
    }

    public function send(Request $request)
    {
        // Envoyer newsletter à tous les abonnés
        $subscribers = User::where('newsletter_subscribed', true)->get();
        
        foreach ($subscribers as $user) {
            try {
                // Ici tu envoies ta newsletter avec articles
                // Mail::to($user->email)->send(new Newsletter($articles));
            } catch (\Exception $e) {
                \Log::error('Erreur envoi newsletter à ' . $user->email . ': ' . $e->getMessage());
            }
        }
        
        return back()->with('success', 'Newsletter envoyée à ' . $subscribers->count() . ' abonnés');
    }
}