const db = require('../data/db-config')

function findUser(filter) {
    return db('users').where(filter).first()
}

async function addUser(user) {
    const [{ user_id }] = await db('users').insert(user, ['user_id'])
    return findUser({ user_id });
}

function getUserClasses(userId) {
    return db('classes as c')
        .leftJoin('users_classes as uc', 'uc.class_id', 'c.class_id')
        .where('uc.user_id', userId)
}

function registerUserInClass() {
    return
}

function removeUserFromClass() {
    return
}

module.exports = { findUser, addUser, getUserClasses, registerUserInClass, removeUserFromClass }
