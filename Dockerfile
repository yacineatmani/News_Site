FROM composer:2 AS vendor_build
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress --ignore-platform-reqs

FROM php:8.2-cli-alpine AS app
WORKDIR /var/www/html

RUN apk add --no-cache bash git libzip-dev sqlite-dev oniguruma-dev icu-dev \
    && docker-php-ext-install pdo pdo_sqlite mbstring

COPY . .
COPY --from=vendor_build /app/vendor ./vendor

RUN mkdir -p storage/logs bootstrap/cache database \
    && touch database/database.sqlite \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8000

CMD ["sh", "-c", "cp -n .env.example .env || true && php artisan key:generate --force && php artisan config:cache || true && php artisan route:cache || true && php artisan migrate --force || true && php artisan serve --host=0.0.0.0 --port=8000"]
