
<h1 align="center">Challenge 1</h1>
<h4><p align="center">An api to register cities and clients</p></h4>
<p align = "center"><img src ="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></img>
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></img>  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"></img> <img src = "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"> </img> <img src ="https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge"></img></p>



#### Status: Development :warning:
# Getting started

## Dependencies

### Production dependencies
* Node Js
*  Typescript
*  JOI
* TypeORM
* Postgres DB
* reflect-metadata
* dotEnv
* Swagger-ui-express
### Development Dependencies
* Jest
*  Supertest
*  Cross-ENV
*  Eslint airbnb + prettier
*  Ts-node-dev

## Installation

First of all, to install our api clone the repository  in your terminal with:
```raw 
git clone https://github.com/gabrigabe/api-challenge1.git
```
after this, go to project file:
```raw 
cd api-challenge1
```
install api dependencies with:
```raw 
npm install OR yarn install
```
Now rename the file "example.ormconfig.json" to"ormconfig.json" and ".env.example" to ".env" and fill the empty fields with your data , on ormconfig fill databases of production, developmend and tests according to your uses.

## Running

start with production db:
```raw 
npm start OR yarn start
```
start with development db:
```raw 
npm run dev OR yarn dev
```
run tests with tests db:
```raw
npm test OR yarn test
```
**Renember to config on ormconfig.json

# API ROUTES

## Docs
````
 /api/v1/routes
````
Runs the swagger ui of application


