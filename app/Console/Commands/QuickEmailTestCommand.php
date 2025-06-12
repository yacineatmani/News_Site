<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class QuickEmailTestCommand extends Command
{
    protected $signature = 'email:quick-test';
    protected $description = 'Quick email test';

    public function handle()
    {
        $this->info('Sending quick test email...');
        
        try {
            Mail::raw('Test rapide depuis Laravel', function($message) {
                $message->to('test@example.com')
                        ->subject('Test Rapide Laravel');
            });
            
            $this->info('✅ Email envoyé !');
        } catch (\Exception $e) {
            $this->error('❌ Erreur: ' . $e->getMessage());
        }
    }
}
