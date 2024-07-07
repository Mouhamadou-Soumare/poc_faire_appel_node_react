<h1 align="center">
  <br>
  <a href="#"><img src="https://github.com/Mouhamadou-Soumare/poc_faire_appel_node_react/Levi.png" alt="Levi" width="100"></a>
  <br>
  LEVI, Toujours au top
  <br>
</h1>

<h4 align="center">LEVI - Toujours au top.</h4>

<br/>
<br/>


![screenshot](https://github.com/Mouhamadou-Soumare/poc_faire_appel_node_react/Levi.png)
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

L'application comprends les différentes pages suivantes:

/ : Page de login
/register : Page d'inscription
/payment : Paiement de cotisation après inscription
/dashboard : Tableau de bord
/dashboard/attendance : Faire l'appel

## Fonctionnalités et pages

Frontend: React, Tailwind CSS
Backend: Node.js, Express.js
Base de données: MySQL avec Sequelize ORM
Authentification: JWT (JSON Web Tokens)
Conteneurisation: Docker

## Tests unitaires

```bash
$ docker-compose exec backend npm test
```

## Tests Postman

Telecharger le fichier Postman_Partiel.postman_collection.json et faire un import sur postman pour tester les endpoints

## Fonctionnalités paiements via paypal

Cette application inclut des fonctionnalités de paiement via PayPal.


