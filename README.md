# ALiVE

Vous trouverez ci-dessous des commandes vous aidant à démarrer le projet comme il se doit.

## INSTALLATION EN PRODUCTION

ATTENTION ! La dernière version de Docker DOIT être installé sur l'ordinateur ! [Obtenir la dernière version de Docker](https://www.docker.com)

1. Pour lancer le serveur en production, il faut d'abord se rendre à la racine du projet ALiVE.

2. Par la suite, il faut créer un fichier `.env`, vous pouvez prendre exemple sur le fichier `example.env`.

Ce fichier ressemble à cela:

```
MYSQL_ROOT_PASSWORD=CHANGE_ME
MYSQL_ROOT_HOST=%
MYSQL_USER=alive
MYSQL_PASSWORD=CHANGE_ME
MYSQL_DATABASE=alive
```

4. Il est très important de changer les deux mot de passe `CHANGE_ME` !

5. Une fois toutes ces étapes effectuées, il suffit de lancer la commande:

- `docker compose up -d --build`

6. par la suite, connectez vous au serveur via `localhost:8081`

## DEVELOPPEMENT

### Lancement du backend

1. Vous devez en tout premier vous rendre dans le dossier `backend`

2. Dans ce dossier, un fichier `.env` doit être créé, prenez exemple sur le fichier `example.env`

3. Par la suite, lancer le docker en mode developpement `docker compose --file docker-compose.dev.yml up -d --build`

4. La backend se lance et sera accessible sur `localhost:8080`

5. Vérifiez que le backend est correctement démarré en lancant `localhost:8080/api`

### Lancement du frontend

ATTENTION ! NodeJS 18 ainsi que NPM DOIVENT être installé ! [Obtenir NodeJS](https://nodejs.org/en/)

Pour lancer le frontend en mode developpement:

1. Vous devez vous rendre dans le dossier `frontend/phaser`

2. Par la suite, installez les dépendances du projet `npm ci -D`

3. Ensuite, vous pouvez lancer le frontend en mode developpement `npm run start`
