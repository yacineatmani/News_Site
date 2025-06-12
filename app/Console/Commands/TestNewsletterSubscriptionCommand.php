<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\NewsletterController;
use Illuminate\Http\Request;
use App\Models\User;

class TestNewsletterSubscriptionCommand extends Command
{
    protected $signature = 'newsletter:subscribe-test {email}';
    protected $description = 'Test complete newsletter subscription process';

    public function handle()
    {
        $email = $this->argument('email');
        $this->info("Testing newsletter subscription for: {$email}");
        
        try {
            // Créer une requête simulée
            $request = Request::create('/newsletter/subscribe', 'POST', [
                'email' => $email
            ]);
            
            // Appeler le contrôleur
            $controller = new NewsletterController();
            $response = $controller->subscribe($request);
            
            $this->info('Newsletter subscription completed');
            
            // Vérifier le résultat
            $user = User::where('email', $email)->first();
            if ($user && $user->newsletter_subscribed) {
                $this->info("✅ Success: User {$email} is now subscribed");
                $this->info("User name: {$user->name}");
                $this->info("User ID: {$user->id}");
            } else {
                $this->error("❌ Failed: User {$email} subscription failed");
            }
            
        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            $this->error('Line: ' . $e->getLine());
            $this->error('File: ' . $e->getFile());
        }
    }
}
