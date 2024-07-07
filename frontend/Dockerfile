# Utiliser l'image officielle Node.js avec la version 20
FROM node:20

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier package.json et package-lock.json (si présent) dans /app
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application tourne
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
