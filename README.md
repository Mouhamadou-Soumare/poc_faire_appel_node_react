<h1 align="center">
  <br>
  <br>
  LEVI, Toujours au top
  <br>
</h1>

<h4 align="center">LEVI - Toujours au top.</h4>

<br/>
<br/>


![screenshot](https://github.com/Mouhamadou-Soumare/poc_faire_appel_node_react/blob/main/Levi.png)
<br/>
<br/>



## Comment utiliser ce projet

Pour cloner et exécuter cette application, vous aurez besoin de [Git](https://git-scm.com) et de [Docker](https://www.docker.com/) installés sur votre ordinateur. À partir de votre ligne de commande :

```bash
# Clonez ce dépôt.
$ git clone https://github.com/Mouhamadou-Soumare/poc_faire_appel_node_react

# Accédez au répertoire du projet.
$ cd poc_faire_appel_node_react

# Construisez et démarrez les conteneurs Docker.
$ docker-compose up -d --build
```

## Fonctionnalités et pages

L'application comprends les différentes pages suivantes:<br/><br/>

/ : Page de login<br/>
/register : Page d'inscription<br/>
/payment : Paiement de cotisation après inscription <br/>
/dashboard : Tableau de bord <br/>
/dashboard/attendance : Faire l'appel<br/>

## Technologies utilisées

Frontend: React, Tailwind CSS <br/>
Backend: Node.js, Express.js <br/>
Base de données: MySQL avec Sequelize ORM <br/>
Authentification: JWT (JSON Web Tokens) <br/>
Conteneurisation: Docker <br/>

## Tests unitaires

```bash
$ docker-compose exec backend npx jest
```



## Tests Postman

Telecharger le fichier Postman_Partiel.postman_collection.json et faire un import sur postman pour tester les endpoints

## Fonctionnalités paiements via paypal

Cette application inclut des fonctionnalités de paiement via PayPal.


## Jeu de données

Cette application est dotée d'un jeu de données qui se met en place automatiquement lors du build Docker. Un utilisateur que vous pouvez utiliser pour vous connecter est :
<br/>

```bash
Identifiant : "choeurtis"
Mot de passe : "password"
```

## Point à améliorer

Actuellement, le tableau de bord et les fonctionnalités d'administration sont accessibles à tous les rôles. Bien que le JWT token soit utilisé pour sécuriser les données, il est possible d'accéder au tableau de bord simplement en entrant l'URL, à condition d'être connecté.
<br/>

Pour renforcer la sécurité et l'intégrité du système, voici quelques points à améliorer :
<br/>

Contrôle d'accès basé sur les rôles (RBAC) <br/>

Vérification côté serveur <br/>

Redirection et gestion des erreurs <br/>

Ces améliorations renforceront la sécurité et assureront que chaque utilisateur n'a accès qu'aux fonctionnalités et aux données correspondant à son rôle. <br/>
Un autre point à mettre en place rapidement est la mise en place d'un fichier .env pour les données sensibles 
<br/>
Cependant, il est important de rappeler que ce projet est un proof of concept (PoC) visant principalement à tester la mise en place d'une fonctionnalité.
