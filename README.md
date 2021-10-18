# Build Week Scaffolding for Node and PostgreSQL

## Scripts

- **start**: Runs the app in production.
- **server**: Runs the app in development.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.
- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Interact with the Heroku database from the command line using psql.
- **seedh**: Runs all seeds in the Heroku database.

## Hot Tips

- Figure out the connection to the database and deployment before writing any code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

# Classes endpoints

- [GET]  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/api/classes get all classes
- [GET]  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/api/classes/{id} get class by id
- [POST]  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/api/classes/ add a class
- [PUT]  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/api/classes/{id} update a class by id
- [DELETE] https://ft-anywhere-fitness-5.herokuapp.com/api/classes/api/classes/{id} delete a class by id

# Auth endpoint 

- [POST]  https://ft-anywhere-fitness-5.herokuapp.com/api/auth/register
- [POST]  https://ft-anywhere-fitness-5.herokuapp.com/api/auth/login


