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
    console.log(alreadyInClass)
    
    if(alreadyInClass.length > 0){
        return 'You are already registered for this class'

    } else if(parseInt(chosenClass[0].class_max_size) > parseInt(chosenClass[0].class_registered_attendees)) {
        // transaction
        // db('classes')
        //     .where("class_id", classId.class_id)
        //     .update('class_registered_attendees', chosenClass[0].class_registered_attendees + 1)
        // return db('users_classes')
        //     .insert({ class_id: parseInt(classId.class_id), user_id: parseInt(userId) })
        //     .returning('class_id')
    }
    return 'max class size already reached'

}

// - [POST]  https://ft-anywhere-fitness-5.herokuapp.com/api/user/ requires a class id object({"class_id": 1}). returns the class id.
// - [DELETE]  https://ft-anywhere-fitness-5.herokuapp.com/api/user/ requires a class id object, same as above. returns the deleted class id 

function removeUserFromClass(userId, classId) {
    // transaction here as well
    // return db('users_classes as uc')        
    // .returning('class_id')
    // .where({ class_id: parseInt(classId), user_id: parseInt(userId) })
    // .del()
}

module.exports = { findUser, addUser, getUserClasses, registerUserInClass, removeUserFromClass }
