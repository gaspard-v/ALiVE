# ALiVE

Vous trouverez ci-dessous des commandes vous aidant à démarrer le projet comme il se doit.

#### INSTALLATION
Afin d'installer les packets nécessaire veuillez executer :
- `cd backend && npm install && cd ../frontend/phaser && npm install && cd ../react-app && npm install && cd ../..`


#### DEVELOPPEMENT

Quant au lancement de celui-ci en mode de développement il s'agit de ces 3 commandes à executer dans des terminaux différents :
- `cd backend && npm install && npm run run`
- `cd frontend/phaser && npm install && npm run start`
- `cd frontend/react-app && npm install && npm run start`


#### BDD

Pour le lancement de la BDD il faut executer la commande suivante :
- `docker-compose up -d`

#### TESTS

Nous avons fait le choix d'utiliser JEST pour effectuer nos tests. 
Pour lancer ces tests, il faut exécuter cette ligne de commande dans le dossier backend :
-  node --experimental-vm-modules node_modules/jest/bin/jest.js

