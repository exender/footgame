# Authentification d'Utilisateur avec Node.js et Express.js

API REST d'authentification d'utilisateur construite avec Node et Express. L'API REST comprend la connexion de l'utilisateur, l'inscription de l'utilisateur, la réinitialisation du mot de passe, le stockage des abonnés par e-mail, les e-mails automatiques, etc. Il vous suffit de cloner le référentiel, d'ajouter le lien de votre base de données, d'ajouter vos clés d'API, de personnaliser l'API en fonction de vos besoins et de commencer à utiliser l'API REST.

## Fonctionnalités & Caractéristiques
* Connexion
* Inscription
* Réinitialisation du mot de passe
* Déconnexion

## Démarrage

Ci-dessous, vous trouverez le processus d'installation, les prérequis et plus d'informations pour développer ces fonctionnalités d'authentification d'utilisateur en quelques minutes.

### Prérequis

Installez la dernière version de npm
```sh
npm install npm@latest -g
```

Créez une base de données MongoDB (facultatif - ou utilisez Robo3T)
* Lien - https://www.mongodb.com/


### Installation

1. Installez les packages NPM
   ```sh
   npm install
   ```
2. Mettez à jour l'URL de votre base de données dans le fichier `.env`

   ```JS
   DATABASE='ENTREZ VOTRE URL DE BASE DE DONNÉES'
   ```
3. Démarrez le serveur
   ```sh
   npm start
   ```

## Variables d'environnement

These environment variables will be used for configuring different services by default:
| Key                 | Default Value            | Description                                                                                         |
|---------------------|--------------------------|-----------------------------------------------------------------------------------------------------|
| `DATABASE` | `url`              | MongoDB Cluster URL                                                                                   |
| `SECRET` | `value`                  | Used for Creating unique tokens                                                                                  |
| `API_KEY` | `key`               | API Key for your Endpoint (can be anything)                                                                              
                                                                       

## Routes
| URL                             | Method | Description                                              | Content (Body)          |
|---------------------------------|:-----------:|----------------------------------------------------------|-------------------------|
| /api/signup              |     POST    | Registers a user and sends email verification            | `firstname` `lastname` `email` `password`        |
| /api/signin                 |     POST    | Login with existing user   | `email` `password`          |
| /api/sendverificationcode                |     PUT     | Send Verification code to change password  | `email` |
| /api/resetpassword        |     PUT    | Changes User's Password                    | `id` `verificationCode` `newPassword`  |
| /api/signout |     GET     | Signs out a User                    | None |
| /api/user/:userId              |     GET    | Retrieve the Single User | None |
| /api/user/:userId                    |     PUT     | Updates the Single User and returns user                   | `name` `email` `password`            |
| /api/user/:userId           |     DELETE    | Deletes the Single User       | None    |
| /api/users/:userId           |     GET    | Get all Users(only admin)       | None    |

Add `api-key` in header of request and `authorization` in header for routes protected (it's the cookie when you signin).