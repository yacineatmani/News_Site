<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Swift_SmtpTransport;
use Swift_Mailer;
use Swift_Message;

class TestMailtrapDirectCommand extends Command
{
    protected $signature = 'mailtrap:direct-test';
    protected $description = 'Test Mailtrap with direct SMTP connection';

    public function handle()
    {
        $this->info('Testing direct SMTP connection to Mailtrap...');
        
        try {
            // Configuration avec timeout court
            $transport = (new Swift_SmtpTransport('sandbox.smtp.mailtrap.io', 2525))
                ->setUsername('a7f8a2f90920d5')
                ->setPassword('ffd9a6a938e2f9')
                ->setTimeout(10); // 10 secondes timeout
            
            $mailer = new Swift_Mailer($transport);
            
            $message = (new Swift_Message('Test Direct Mailtrap'))
                ->setFrom(['no-reply@yacineatmani.com' => 'Site News'])
                ->setTo(['test@example.com'])
                ->setBody('Test envoi direct vers Mailtrap depuis Laravel');
            
            $this->info('Sending email...');
            $result = $mailer->send($message);
            
            if ($result) {
                $this->info("✅ Email sent successfully! ({$result} recipients)");
            } else {
                $this->error("❌ Failed to send email");
            }
            
        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            $this->error('Class: ' . get_class($e));
        }
    }
}
