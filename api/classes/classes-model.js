const db = require('../data/db-config');

// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

function getClasses() {
    return db
        .select(
            'class_name',
            'class_type',
            'class_start_time',
            'class_duration',
            'class_intensity',
            'class_location',
            'class_registered_attendees',
            'class_max_size'
        )
        .from('classes')
}

function getClassById(class_id) {
    return db
        .select(
            'class_name',
            'class_type',
            'class_start_time',
            'class_duration',
            'class_intensity',
            'class_location',
            'class_registered_attendees',
            'class_max_size'
        )
        .from('classes')
        .where('class_id', class_id)
}

function findBy(filter) {
    return db
        .select(
            'class_name',
            'class_type',
            'class_start_time',
            'class_duration',
            'class_intensity',
            'class_location',
            'class_registered_attendees',
            'class_max_size'
        )
        .from('classes')
        .where(filter)
}

function addClass() {
    return
}

function updateClass() {
    return
}
function deleteClass() {
    return
}

module.exports = {
    getClasses,
    getClassById,
    addClass,
    updateClass,
    deleteClass,
}
