<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Mail\NewsletterSubscribed;
use Illuminate\Support\Facades\Mail;

class TestNewsletterCommand extends Command
{
    protected $signature = 'newsletter:test {email}';
    protected $description = 'Test newsletter subscription';

    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            $this->error("Utilisateur avec email {$email} non trouvé");
            return 1;
        }
        
        $this->info("Utilisateur trouvé: {$user->name} ({$user->email})");
        $this->info("Statut newsletter actuel: " . ($user->newsletter_subscribed ? 'Abonné' : 'Non abonné'));
        
        // Mettre à jour le statut
        $user->update(['newsletter_subscribed' => true]);
        $this->info("Statut mis à jour: Abonné");
        
        // Tenter d'envoyer l'email
        try {
            $this->info("Tentative d'envoi de l'email...");
            Mail::to($user->email)->send(new NewsletterSubscribed($user));
            $this->info("Email envoyé avec succès !");
        } catch (\Exception $e) {
            $this->error("Erreur lors de l'envoi: " . $e->getMessage());
            $this->error("Stack trace: " . $e->getTraceAsString());
        }
        
        return 0;
    }
}
