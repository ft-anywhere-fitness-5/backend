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
        .leftJoin('classes as c', 'uc.class_id', 'c.class_id')
}

function registerUserInClass() {
    return
}

function removeUserFromClass() {
    return
}

module.exports = { findUser, addUser }
