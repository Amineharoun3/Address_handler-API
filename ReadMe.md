Address API
API REST dockerisée pour enregistrer des adresses via l'API BAN et consulter les risques associés via l'API Géorisques.
Prérequis

Node.js 16+
Docker
Docker Compose

Installation

mon repot git :git clone <repo>
cd address-api


Configurez les variables d'environnement dans .env (voir .env.example) :TYPEORM_CONNECTION=sqlite
TYPEORM_DATABASE=/data/db.sqlite



Lancement
docker compose build
docker compose up

L'API sera disponible sur http://localhost:8000.
Endpoints
POST /api/addresses/
Enregistre une adresse via l'API BAN.
Payload:
{ "q": "8 bd du port" }

Réponses:

200 OK:{
  "id": 1,
  "label": "8 Boulevard du Port 80000 Amiens",
  "housenumber": "8",
  "street": "Boulevard du Port",
  "postcode": "80000",
  "citycode": "80021",
  "latitude": 49.897443,
  "longitude": 2.290084
}


400 Bad Request:{ "error": "Le champ 'q' est requis et doit être une chaîne non vide." }


404 Not Found:{ "error": "Adresse non trouvée. Aucun résultat ne correspond à votre recherche." }


500 Internal Server Error:{ "error": "Erreur serveur : impossible de contacter l'API externe." }



GET /api/addresses/{id}/risks/
Récupère les risques associés à une adresse via l'API Géorisques.
Réponses:

200 OK:{ /* JSON brut retourné par https://georisques.gouv.fr/api/v1/resultats_rapport_risque */ }


404 Not Found:{ "error": "Adresse non trouvée." }


500 Internal Server Error:{ "error": "Erreur serveur : échec de la récupération des données de Géorisques." }



Note sur l'API Géorisques
L'endpoint initial https://www.georisques.gouv.fr/api/v3/v1/resultats_rapport_risque renvoyait une erreur 404. Après investigation, l'endpoint correct est https://georisques.gouv.fr/api/v1/resultats_rapport_risque, qui est utilisé dans cette implémentation.
Tests
Exécutez les tests unitaires avec :
npm run test

Variables d'environnement
Voir .env.example :
TYPEORM_CONNECTION=sqlite
TYPEORM_DATABASE=/data/db.sqlite

