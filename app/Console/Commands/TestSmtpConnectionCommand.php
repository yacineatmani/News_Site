<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestSmtpConnectionCommand extends Command
{
    protected $signature = 'smtp:test';
    protected $description = 'Test SMTP connection to Mailtrap';

    public function handle()
    {
        $this->info('Testing SMTP connection to Mailtrap...');
        
        try {
            // Test de connexion simple
            $socket = @fsockopen('sandbox.smtp.mailtrap.io', 2525, $errno, $errstr, 10);
            
            if ($socket) {
                $this->info('✅ Connection to Mailtrap SMTP successful');
                fclose($socket);
                
                // Test d'envoi simple
                $this->info('Testing email sending...');
                
                try {
                    \Mail::raw('Test de connexion SMTP', function($message) {
                        $message->to('test@example.com')
                                ->subject('Test SMTP Connection');
                    });
                    
                    $this->info('✅ Email sent successfully!');
                } catch (\Exception $e) {
                    $this->error('❌ Email sending failed: ' . $e->getMessage());
                }
                
            } else {
                $this->error("❌ Cannot connect to Mailtrap SMTP: $errstr ($errno)");
                $this->info('Please check:');
                $this->info('- Internet connection');
                $this->info('- Firewall settings');
                $this->info('- Mailtrap credentials');
            }
            
        } catch (\Exception $e) {
            $this->error('❌ Connection test failed: ' . $e->getMessage());
        }
    }
}
