
  

<h1  align="center">Challenge 1</h1>

<h4><p  align="center">An api to register cities and clients</p></h4>

<p  align  =  "center"><img  src  ="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></img>
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></img> <img  src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"></img> <img  src  =  "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"> </img> <img  src  ="https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge"></img></p>

  
  
  

#### Status: Development :warning:

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

**Renember to config on ormconfig.json

  

# API ROUTES

  

## Docs

````
/api/v1/routes
````

Runs the swagger ui of application

## Cities

### POST
```
/api/v1/cities
```
Registers a new city

Body example:

```json
{
  "city": "Florianopolis",
  "state": "Santa Catarina"
}
```
Response:

Status 201 : Created
```json
{
  "city": "Florianopolis",
  "state": "Santa Catarina",
  "id": "d9267217-310e-4fd0-ab31-2db4dc148029"
}
```

Status 400: Bad Request

Already registered a equal city in same state:
```json
{
  "description": "BadRequest",
  "message": "City already exists"
}
```
Invalid field names on body or missing fields:
```json
[
  {
    "description": "state",
    "message": "\"state\" is required"
  },
  {
    "description": "anyfield",
    "message": "\"anyfield\" is not allowed"
  }
]
```
##
### GET
````
/api/v1/cities
````

Get all cities, results also can be filtered by page, limit, city or state in query params.

Status 200: Ok
```json
{
  "docs": [
    {
      "id": "eee29c11-eb4f-42d4-95db-10e5d65b6d04",
      "city": "Fortaleza",
      "state": "Ceara"
    }
  ],
  "limit": 10,
  "page": 1,
  "pages": 1,
  "totalDocs": 1
}
```
Status 400: Bad Request

Try to pass a invalid query:
```json
[
  {
    "description": "anyquery",
    "message": "\"anyquery\" is not allowed"
  }
]
```
Status 404: Not Found

No results found:
```json
{
  "description": "Notfound",
  "message": "No results found"
}
```
##
### GET by city name
```
/api/v1/cities/:city
```
Gets all cities with same name.

Status 200: Ok

```json
{
  "docs": [
    {
      "id": "d4c8419b-c05a-4a6a-bd19-0d89511d0568",
      "city": "Bom Jesus",
      "state": "Paraiba"
    },
    {
      "id": "cff6c713-2f2f-406b-8ccd-4dd5f91ca89e",
      "city": "Bom Jesus",
      "state": "Rio Grande do Sul"
    },
    {
      "id": "c9d0edbc-3804-4dcb-8964-1565d26fb78f",
      "city": "Bom Jesus",
      "state": "Santa Catarina"
    }
  ],
  "limit": 10,
  "page": 1,
  "pages": 1,
  "totalDocs": 3
}
```
Status 404: Not Found

No cities found
```json
{
  "description": "Notfound",
  "message": "No results found"
}
```
##
### GET by state name
```
/api/v1/state/:state
```
Gets all cities of a state

Status 200: Ok

```json
{
  "docs": [
    {
      "id": "eee29c11-eb4f-42d4-95db-10e5d65b6d04",
      "city": "Fortaleza",
      "state": "Ceara"
    },
    {
      "id": "4bc5c364-4d13-4b97-a343-83f8f2a32012",
      "city": "Maracanau",
      "state": "Ceara"
    },
    {
      "id": "478958ae-a94d-40d9-8f19-7aa2aba3e1a8",
      "city": "Russas",
      "state": "Ceara"
    }
  ],
  "limit": 10,
  "page": 1,
  "pages": 1,
  "totalDocs": 3
}
```
Status 404: Not Found

No cities found
```json
{
  "description": "Notfound",
  "message": "No results found"
}
```

## Clients

### POST
```
/api/v1/clients
```
Registers a new client

Body example:

```json
{
  "full_name": "Jose Silva",
  "gender": "male",
  "birthdate": "1981/05/01",
  "age": 40,
  "city_id": "d4c8419b-c05a-4a6a-bd19-0d89511d0568"
}
```
Response:

Status 201 : Created
```json
{
  "full_name": "Jose Silva",
  "gender": "male",
  "birthdate": "1981/05/01",
  "age": 40,
  "city_id": "d4c8419b-c05a-4a6a-bd19-0d89511d0568",
  "id": "07baf137-ed82-405b-be3c-c0f9758e95ea"
}
```

Status 400: Bad Request

Invalid UUID on city_id:
```json
{
  "description": "city_id",
  "message": "\"city_id\" must be a valid GUID"
}
```

Invalid field names on body or missing fields:
```json
[
  {
    "description": "full_name",
    "message": "\"full_name\" is required"
  },
  {
    "description": "anyfield",
    "message": "\"anyfield\" is not allowed"
  }
]
```
Status 404: Not Found

city_id not found:
```json
{
  "description": "Notfound",
  "message": "This city id doesnt exist"
}
```
##
### GET
```
/api/v1/clients
```
Gets all clients, results can be filtered by page, limit, full name. age, gender or city_id on query.

Status 200: Ok
```json
{
  "docs": [
    {
      "id": "3b5044dc-ce69-4dbe-b39b-955e3d6a97bf",
      "full_name": "Jose Silva",
      "gender": "male",
      "birthdate": "1981-05-01T03:00:00.000Z",
      "age": 40,
      "localizacao": {
        "city": "Bom Jesus",
        "state": "Paraiba"
      }
    }
  ],
  "limit": 10,
  "page": 1,
  "pages": 1,
  "totalDocs": 1
}
```

Status 400: Bad Request

Try to pass a invalid query:
```json
[
  {
    "description": "anyquery",
    "message": "\"anyquery\" is not allowed"
  }
]
```
Status 404: Not Found

No results found:
```json
{
  "description": "Notfound",
  "message": "No results found"
}
```
##
### GET by id
```
/api/v1/clients/:id
```
Gets a client by id

Status 200: OK