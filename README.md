Steps To Run Backend

1) Install Npm Packages  via (npm install command)

2) Check env-example file and make an env file similar to that in root path

3) Techstack used for backend is Postgres Database, Nest JS & Typeorm

4) Create Database in pgadmin or something like that

5) Run Migrations via command (npm run migration:run)

6) Run server using command (npm run start:dev)

7) Swagger is integrated in project you can access swagger on route (BASE_URL from env/api endipoint e.g: http://localhost:3001/api)

8) Run Tests using command (npm run test)

#For Dev Purpose

1) Create Migration Command => npm run typeorm:cli migration:generate -d database/migrations/migration_file_name
