# MEN stack API RESTful with JWT

Esta é uma API RESTful que fiz usando a men stack com o objectivo de consolidar os meus conhecimentos acerca dessas maravilhosas tecnologia.

## Tecnologias
- Mongodb (Banco de dados NoSQL)
- ExpressJs (Framework web)
- NodeJs (Runtime Javascript)
- Typescript

## Features
- Autenticação & Autorização de Usuários via JWT (Json Web Token) 
- Tráfego de dados em formato JSON (Javascript Object Notation)

## Requesitos
- `git`
- `NodeJs >= 12`
- `yarn`

## Instalação
```
git clone https://github.com/edilson258/menstack-api-jwt-typescript.git
cd menstack-api-jwt-typescript
yarn
```

## Métodos aceites

Métodos | Acesso aos dados | Previlegios
------- | ---------------- | -----------
GET     | LER              | Token valido
------- | ---------------  | ------------
POST    | CRIAR            | Admin
------- | ---------------  | ------------
PATCH   | EDITAR           | Admin
------- | ---------------  | ------------
DELETE  | APAGAR           | Admin

