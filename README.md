# Anywhere Fitness 5 API

## Scripts

- **start**: Runs the app in production.
- **server**: Runs the app in development.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.

## Built With

- Node
- Express
- Knex
- PostgreSQL
- Joi

# Auth endpoint 

- `POST`  https://ft-anywhere-fitness-5.herokuapp.com/api/auth/register requires (username, password, role(defaults to client))(all strings) where the username must be unique. Returns { username, user_id }.
- `POST`  https://ft-anywhere-fitness-5.herokuapp.com/api/auth/login requires valid credentials (username, password) Returns {message, user,token} where message is 'Hello username', and the user is the full user object.


# Classes endpoints

- `GET`  https://ft-anywhere-fitness-5.herokuapp.com/api/classes returns an array of class objects.
- `GET`  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/:class_id returns an array with the class object.
- `POST`  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/ requires a class object, (class_name (string), class_type(string),class_start_time(string), class_duration(integer), class_intensity(string),class_location(string), class_registered_attendees(integer), class_max_size(integer)), returns the newly create class object.
- `PUT`  https://ft-anywhere-fitness-5.herokuapp.com/api/classes/:class_id requires a class object, same as above, returns the updated class object.
- `DELETE` https://ft-anywhere-fitness-5.herokuapp.com/api/classes/:class_id returns the deleted id of the class, class name and class type.


# Users endpoints

- `GET`  https://ft-anywhere-fitness-5.herokuapp.com/api/user/ returns an array of class objects specific to a user
- `POST`  https://ft-anywhere-fitness-5.herokuapp.com/api/user/ requires a class id object({"class_id": 1}). returns the class object.
- `PUT`  https://ft-anywhere-fitness-5.herokuapp.com/api/user/:class_id the url takes in the old class id, requires a class id object of the updated class, same as above, returns the updated class id.
- `DELETE`  https://ft-anywhere-fitness-5.herokuapp.com/api/user/ requires a class id object, same as above. returns the deleted class id 
