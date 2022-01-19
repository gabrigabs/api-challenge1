
  

<h1  align="center">Challenge 1</h1>

<h4><p  align="center">An API written in Node.js and typescript that can register cities and clients, also you can list paginated results, limit results per page, also filter results by query params, and you can also manage clients by id changing full name or deleting him</p></h4>

<p  align  =  "center"><a href= https://www.typescriptlang.org/><img  src  ="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></a><a href = https://nodejs.org/en/></img>
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></img</a> <a href=https://expressjs.com/><img  src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"></img></a> <a href=https://www.postgresql.org/><img  src  =  "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"> </img></a> <a href=https://choosealicense.com/licenses/mit/> <img  src  ="https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge"></img></a></p>

  
  
  

##  Author

### **Gabriel Bezerra Rodrigues**  
<p><a href=https://www.linkedin.com/in/gabriel-be-zerra/><img src = https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white></a> <a href=https://github.com/gabrigabe><img src=https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white></a></p>

# Getting started

  

## Dependencies

  

### Global dependencies

* PostgresDB

* Node.JS

  

### API dependencies

* JOI

* TypeORM
* Express.js

* reflect-metadata

* dotEnv

* Swagger-ui-express

### API development dependencies

* Jest

* Typescript

* Supertest

* Cross-ENV

* Eslint airbnb + prettier

* Ts-node-dev

  

## Installation

  

First of all, to install our api clone the repository in your terminal with:

```raw
git clone https://github.com/gabrigabe/api-challenge1.git
```

after this, go to project file:

```raw
cd api-challenge1
```

install api dependencies with:

```raw
npm install
    OR
yarn install
```

Now rename the file "example.ormconfig.json" to"ormconfig.json" and ".env.example" to ".env" and fill the empty fields with your data , on ormconfig fill databases of production, developmend and tests according to your uses.

#### :warning:: Remember to create the databases schemas on your postgres manually
After this run db migrations
```raw
npm run typeorm migration:run -c CONNECTION NAME HERE
				        OR
yarn typeorm migration:run -c CONNECTION NAME HERE
```

  

## Running

  

start with production db:

```raw
npm start 
   OR
yarn start
```

start with development db:

```raw
npm run dev 
   OR 
yarn dev
```

run tests with tests db:

```raw
npm test 
   OR 
yarn test
```

**Remember to config on ormconfig.json

  
