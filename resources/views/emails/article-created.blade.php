<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouvel Article - Site News</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: #4f46e5; color: white; padding: 30px 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .button { display: inline-block; padding: 12px 25px; background: #4f46e5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📰 Nouvel Article Publié</h1>
        </div>
        <div class="content">
            <h2>{{ $article->title }}</h2>
            
            <p><strong>👤 Auteur :</strong> {{ $article->user->name }}</p>
            <p><strong>📂 Catégorie :</strong> {{ $article->category->name ?? 'Aucune' }}</p>
            
            @if($article->tags->count() > 0)
            <p><strong>🏷️ Tags :</strong> 
                @foreach($article->tags as $tag)
                    <span style="background: #e5e7eb; padding: 2px 8px; border-radius: 12px; font-size: 12px;">{{ $tag->name }}</span>
                @endforeach
            </p>
            @endif
            
            <p><strong>📝 Aperçu :</strong></p>
            <p style="background: #f8f9fa; padding: 15px; border-left: 4px solid #4f46e5;">
                {{ Str::limit($article->content, 200) }}
            </p>
            
            <a href="{{ url('/articles/' . $article->id) }}" class="button">
                👀 Voir l'article complet
            </a>
        </div>
        <div class="footer">
            <p>Email automatique de Site News</p>
            <p>{{ now()->format('d/m/Y à H:i') }}</p>
        </div>
    </div>
</body>
</html>