exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.string('role', 12).notNullable().defaultTo('client')
      users.timestamps(false, true)
    })
    .createTable('classes', (classes) => {
      classes.increments('class_id')
      classes.string('class_name', 255).notNullable()
      classes.string('class_type', 255).notNullable()
      classes.string('class_start_time', 255).notNullable()
      classes.integer('class_duration').notNullable().unsigned()
      classes.string('class_intensity', 255).notNullable()
      classes.string('class_location', 255).notNullable()
      classes.integer('class_registered_attendees').notNullable().unsigned()
      classes.integer('class_max_size').notNullable().unsigned()
    })
    .createTable('users_classes', (attendee) => {
      attendee.increments('attendance_id')
      attendee.integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      attendee.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users_classes')
  await knex.schema.dropTableIfExists('classes')
  await knex.schema.dropTableIfExists('users')
}
