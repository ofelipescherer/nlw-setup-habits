Backend API Restful

localhost:3333/habits





- Config Prisma
```
npm i -D prisma
npm i @prisma/client


npx prisma init --datasource-provider SQLite
```

Porque banco SQLite

- Porque cria um arquivo local de banco de dados, então não precisamos usar docker ou alguma coisa parecida para criar um SQL ou Postgress


```
npx prisma migrate dev
```

Cria uma migration - versionamento 
// Migrations-> Versionamento do banco de dados- prisma cria um arquivo sql


```
npx prisma studio
```
incia um banco de dados



** Cors -> Quais aplicações frontend podem acessar esse backend
- npm install @fastify/cors


npx prisma generate -> cria um svg do banco de dados


Seed - Populador de banco de dados
npx db seed -> popula o banco com as alterações do arquivo seed.ts
