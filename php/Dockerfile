FROM php:7.4-fpm

RUN apt update; apt upgrade;
RUN apt-get update
RUN apt-get install libpq-dev postgresql-11 -y
RUN docker-php-ext-install pdo_pgsql

RUN mkdir -p /var/www/html

