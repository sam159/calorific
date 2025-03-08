FROM php:8.2-apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
COPY --chown=www-data:www-data . /var/www/html
ADD --chown=www-data:www-data docker/env.php /var/www/html/credentials.php

ENV DB_HOST=db \
    DB_USER=php_docker \
    DB_PASS=password123 \
    DB_NAME=calorific \
    DB_COLLATION=utf8mb4_0900_ai_ci

