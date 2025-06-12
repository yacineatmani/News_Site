<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class NewsletterSubscribed extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $customMessage;
    public $emailSubject;

    public function __construct(User $user, $subject = 'Inscription Newsletter Confirmée', $message = null)
    {
        $this->user = $user;
        $this->emailSubject = $subject;
        $this->customMessage = $message ?: "Bienvenue {$user->name} ! Votre inscription à notre newsletter a été confirmée.";
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->emailSubject,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.newsletter-subscribed', // Nouvelle vue
            with: [
                'user' => $this->user,
                'customMessage' => $this->customMessage,
                'subject' => $this->emailSubject,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}