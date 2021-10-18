
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'client1', password: '1234', role: 'client'},
        {username: 'instructor1', password: '1234', role: 'instructor'},
        {username: 'client2', password: '1234', role: 'client'}
      ]);
    });
};
