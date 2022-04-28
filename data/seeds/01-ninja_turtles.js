
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('turtles').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('turtles').insert([
        { name: 'leonardo', weapon: 'katanas', color: 'blue'},
        { name: 'rafael', weapon: 'sai', color: 'red'},
        { name: 'michelangelo', weapon: 'nunchaku', color: 'orange'}
      ]);
    });
};
