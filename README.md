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
# Auth endpoint 

- [POST]  https://ft-anywhere-fitness-5.herokuapp.com/api/auth/register requires (username, password, role(defaults to client))(all strings) where the username must be unique. Returns { username, user_id }
- [POST]  https://ft-anywhere-fitness-5.herokuapp.com/api/auth/login requires valid credentials (username, password) Returns {message, token} where message is 'Hello username'


# Classes endpoints

- [GET]  https://ft-anywhere-fitness-5.herokuapp.com/api/classes returns an array of class objects
- [GET]  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/:class_id returns the class object
- [POST]  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/ requires a class object, (class_name (string), class_type(string),class_start_time(string), class_duration(integer), class_intensity(string),class_location(string), class_registered_attendees(integer), class_max_size(integer)), returns the newly create class object
- [PUT]  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/:class_id requires a class object, same as above, returns the updated class object
- [DELETE] https://ft-anywhere-fitness-5.herokuapp.com/api/classes/:class_id returns the deleted id of the class


# Users endpoints

- [GET]  https://ft-anywhere-fitness-5.herokuapp.com/api/user/:user_id returns an array of class objects specific to a user
- [POST]  https://ft-anywhere-fitness-5.herokuapp.com/api/user/:user_id requires a class id object({"class_id": 1}). returns the class id.
- [DELETE]  https://ft-anywhere-fitness-5.herokuapp.com/api/user/:user_id requires a class id object, same as above. returns the deleted class id
