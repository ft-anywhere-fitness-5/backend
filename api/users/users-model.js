const db = require('../data/db-config')

function findUser(filter) {
    return db('users').where(filter).first()
}

async function addUser(user) {
    const [{ user_id }] = await db('users').insert(user, ['user_id'])
    return findUser({ user_id });
}

function getUserClasses(userId) {
    return db('users_classes as uc')
        .select(
            'c.class_name',
            'c.class_type',
            'c.class_start_time',
            'c.class_duration',
            'c.class_intensity',
            'c.class_location',
            'c.class_registered_attendees',
            'c.class_max_size'
        )
        .leftJoin('classes as c', 'uc.class_id', 'c.class_id')
        .rightJoin('users as u', 'uc.user_id', 'u.user_id')
        .where('uc.user_id', userId)
}

function registerUserInClass(userId, classId) {
    return db('users_classes as uc')
    .insert({ class_id: classId, user_id: userId })
    .returning('class_id')
}

function removeUserFromClass(userId, classId) {
    return db('users_classes as uc')        
    .returning('class_id')
    .where({ class_id: parseInt(classId), user_id: parseInt(userId) })
    .del()
}

module.exports = { findUser, addUser, getUserClasses, registerUserInClass, removeUserFromClass }
