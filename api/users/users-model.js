const db = require('../data/db-config')
const Classes = require('../classes/classes-model')

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

function getUserClassById(userId, classId) {
    return db('users_classes').select('class_id').where({'class_id': classId.class_id, 'user_id': userId})
}

async function registerUserInClass(userId, classId) {
    const chosenClass = await Classes.getClassById(classId)
    const alreadyInClass = await getUserClassById(userId, classId)
    
    if(alreadyInClass.length > 0){
        return 'You are already registered for this class'

    } else if(parseInt(chosenClass[0].class_max_size) > parseInt(chosenClass[0].class_registered_attendees)) {
        try {
                await db.transaction(async trx => {
                    const usersClass = { class_id: parseInt(classId.class_id), user_id: parseInt(userId) }
                    await trx('users_classes').insert(usersClass).returning('class_id')
                    await trx('classes')
                        .where('class_id', classId.class_id)
                        .update('class_registered_attendees', chosenClass[0].class_registered_attendees + 1)
            })
            return chosenClass
        } catch {
            return 'There was an error when registering for the class'
        }
    } else return 'max class size already reached'
}

async function removeUserFromClass(userId, classId) {
    const chosenClass = await Classes.getClassById(classId)
    const alreadyInClass = await getUserClassById(userId, classId)

    if(alreadyInClass.length < 1) {
        return 'You are not registered in this class'
    }
    try {
        await db.transaction(async trx => {
            const usersClass = { class_id: parseInt(classId.class_id), user_id: parseInt(userId) }
            await trx('users_classes').where(usersClass).del()
            await trx('classes')
                .where({ class_id: classId.class_id })
                .update('class_registered_attendees', chosenClass[0].class_registered_attendees - 1)
        })
        return classId.class_id
    } catch {
        return 'There was an error when un-registering for the class'
    }
}

module.exports = { findUser, addUser, getUserClasses, registerUserInClass, removeUserFromClass }
