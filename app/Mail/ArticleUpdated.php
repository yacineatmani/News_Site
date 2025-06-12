<?php


namespace App\Mail;

use App\Models\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ArticleUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public $article;

    public function __construct(Article $article)
    {
        $this->article = $article;
    }

    public function build()
    {
        return $this->subject('Article modifié : ' . $this->article->title)
                    ->view('emails.article-updated');
    }
}