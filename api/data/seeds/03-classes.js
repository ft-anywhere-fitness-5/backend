
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {
          class_name: 'Intro to Yoga',
          class_type: 'Yoga',
          class_start_time: '10:30 a.m.',
          class_duration: '30',
          class_intensity: 'low',
          class_location: 'Park',
          class_registered_attendees: '10',
          class_max_size: '20',
        }        
      ]);
    });
};
