# Projet7-Groupomania
Cloner le projet github sur ordinateur

Le projet contient 2 dossiers dans la branche master: client / server. 

Le Front-end est dans le dossier client (utilisation de React)
Dans le dossier Front-end:

via le terminal, exécuter les commandes suivantes:
- cd client
- npm install
- yarn start

Appuyer sur la touche "y" (yes) pour confirmer le port 3001 en front-end

Vous devriez voir apparaitre dans le terminal:
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://192.168.1.19:3001

Note that the development build is not optimized.
To create a production build, use yarn build.

webpack compiled successfully

Puis dans l'url du navigateur taper l'adresse: http://localhost:3001/register



////////////////////////////////////////////////////////////////////////

Le Back-end est dans le dossier server (utilisation d'une base de données relationnelles MySql dans l'outil Workbench à l'aide d'un ORM Sequelize, utilisation de node.js)
 

Dans le fichier backend:

via le terminal, exécuter les commandes suivantes:
- cd server
- npm install 

Pour accéder à la base de données, appelez une nouvelle base de données "SocialMediaG" et utilisez le mot de passe "password".
Vous trouverez dans le fichier Config.js ces données:
 "database":{
        "host": "127.0.0.1",
        "user": "root",
        "password": "password",
        "database": "SocialMediaG",
        "dialect": "mysql"

   }
   
Revenez dans le terminal et exécuter la commande:
- nodemon server.js

Vous devriez voir apparaitre dans le terminal 
[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Listening on port 3000
Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'Users' AND TABLE_SCHEMA = 'SocialMediaG'
Executing (default): SHOW INDEX FROM `Users` FROM `SocialMediaG`
Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'Posts' AND TABLE_SCHEMA = 'SocialMediaG'
Executing (default): SHOW INDEX FROM `Posts` FROM `SocialMediaG`
Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'Comments' AND TABLE_SCHEMA = 'SocialMediaG'
Executing (default): SHOW INDEX FROM `Comments` FROM `SocialMediaG`
Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'Likes' AND TABLE_SCHEMA = 'SocialMediaG'
Executing (default): SHOW INDEX FROM `Likes` FROM `SocialMediaG`
Database connected !
