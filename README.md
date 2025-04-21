<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Address API
API REST dockerisée pour enregistrer des adresses via l'API BAN et consulter les risques associés via l'API Géorisques.
Prérequis

# Prerequis

Node.js 16+
Docker
Docker Compose

#Installation
mon repot git : git clone git@github.com:Amineharoun3/Address_handler-API.git


## Deploiement

```bash

$ docker-compose build
$ docker-compose up

```

## L'API sera disponible sur http://localhost:8000.

Endpoints
POST /api/addresses/
Enregistre une adresse via l'API BAN.
Payload:
{ "q": "8 bd du port" }

Réponses

```bash
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

```
400 Bad Request:{ "error": "Le champ 'q' est requis et doit être une chaîne non vide." }


404 Not Found:{ "error": "Adresse non trouvée. Aucun résultat ne correspond à votre recherche." }


500 Internal Server Error:{ "error": "Erreur serveur : impossible de contacter l'API externe." }


## GET /api/addresses/{id}/risks/

Récupère les risques associés à une adresse via l'API Géorisques.
Réponses:
200 OK:{ /* JSON brut retourné par https://georisques.gouv.fr/api/v1/resultats_rapport_risque */ }


404 Not Found:{ "error": "Adresse non trouvée." }


500 Internal Server Error:{ "error": "Erreur serveur : échec de la récupération des données de Géorisques." }



## Note sur l'API Géorisques
L'endpoint initial https://www.georisques.gouv.fr/api/v3/v1/resultats_rapport_risque renvoyait une erreur 404. Après investigation, l'endpoint correct est https://georisques.gouv.fr/api/v1/resultats_rapport_risque, qui est utilisé dans cette implémentation.

## Tests
Exécutez les tests unitaires avec :
```bash
$ npm run test
```
Variables d'environnement
Voir .env.example :
TYPEORM_CONNECTION=sqlite
TYPEORM_DATABASE=/data/db.sqlite
```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
