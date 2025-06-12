<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Newsletter - Inscription confirmée</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f8fafc;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .button {
            background: #2563eb;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Inscription Newsletter Confirmée</h1>
    </div>
    
    <div class="content">
        <h2>Bonjour {{ $user->name }} !</h2>
        
        <p><strong>Félicitations ! Votre inscription à notre newsletter a été confirmée avec succès.</strong></p>
        
        <p>Vous recevrez désormais nos dernières actualités sur : <strong>{{ $user->email }}</strong></p>
        
        <p>Au programme :</p>
        <ul>
            <li>📰 Les dernières actualités</li>
            <li>🎯 Articles exclusifs</li>
            <li>🔔 Notifications importantes</li>
        </ul>
        
        <p>Merci de faire partie de notre communauté !</p>
        
        <p>
            <a href="{{ url('/') }}" class="button">Visiter notre site</a>
        </p>
        
        <hr>
        <p style="font-size: 12px; color: #666;">
            Vous ne souhaitez plus recevoir nos emails ?<br>
            <a href="{{ url('/newsletter/unsubscribe/' . base64_encode($user->email)) }}">Se désinscrire</a>
        </p>
    </div>
</body>
</html>