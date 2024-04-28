---
slug: wordpress-with-docker-compose
keywords: ["Docker", "Docker Compose", "WordPress", "Site Bay"]
tags: ["wordpress", "docker", "sitebay"]
description: 'This guide explains how to deploy a WordPress site using Docker and Docker Compose on Site Bay, utilizing a LAMP stack within Docker containers.'
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-29
modified: 2024-04-29
modified_by:
  name: Site Bay
title: Launch WordPress with Docker Compose on Site Bay
aliases: ['/quick-answers/sitebay/wordpress-with-docker-compose/']
authors: ["Site Bay"]
---

Introduction to Docker and Docker Compose

Docker provides a way to run applications securely isolated in a container, packaged with all its dependencies and libraries. It's like having a tiny, portable machine that has everything the application needs to run.

Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. This is perfect for setting up environments like a WordPress site with a separate MySQL database.

Docker containers for WordPress and MySQL are readily available on Docker Hub, allowing for easy deployment.

Benefits of Docker for WordPress
Pre-configured Solutions: No need to manually configure your server environment. Docker containers are ready to use once deployed.
Simplified Updates: Updating WordPress or MySQL is as simple as pulling the latest Docker images.
Isolation: Docker ensures that your applications and their environment remain isolated and do not interfere with the host system or other containers.
Setting Up WordPress with Docker Compose
Installing Docker and Docker Compose

First, ensure Docker and Docker Compose are installed on your Site Bay. Docker allows you to create and manage containers, while Docker Compose helps manage multi-container setups.

Deploying WordPress and MySQL

Create a Project Directory: Make a new directory for your WordPress project and navigate into it:

mkdir ~/wordpress_site && cd ~/wordpress_site


Compose File: Create a docker-compose.yml file in this directory. This file defines your WordPress and MySQL services. Remember to set your passwords for the WORDPRESS_DB_PASSWORD, MYSQL_ROOT_PASSWORD, and MYSQL_PASSWORD variables.

version: '3.3'

services:
  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    volumes:
      - wordpress_data:/var/www/html
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: [Your_Password]
      WORDPRESS_DB_NAME: wordpress

  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: [Your_Password]
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: [Your_Password]

volumes:
  wordpress_data:
  db_data:


Launch Containers: From the project directory, start your containers:

docker-compose up -d


Access WordPress: After the containers start, access your WordPress site by visiting http://localhost:8000 in your browser.

Maintaining Your WordPress Site

Automatic Restarts: The restart: always policy ensures your containers automatically start upon system reboot.

Stopping Containers: To stop the containers, use docker-compose down in your project directory.

Updating WordPress: To update, simply pull the latest images and restart the containers:

docker-compose down
docker-compose pull && docker-compose up -d

Conclusion

Using Docker and Docker Compose streamlines the deployment and management of WordPress sites on Site Bay. This approach not only simplifies initial setup but also facilitates ongoing maintenance and updates. For detailed Docker documentation, visit the official Docker and Docker Compose guides.