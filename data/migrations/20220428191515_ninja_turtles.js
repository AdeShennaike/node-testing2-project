
exports.up = async function(knex) {
  return await knex.schema.createTable('turtles', tbl => {
    tbl.increments('turtle_id'),
    tbl.string("name").unique().notNullable()
    tbl.string('weapon').notNullable()
    tbl.string('color').notNullable()
  })
};

exports.down = async function(knex) {
  return await knex.schema.dropTableIfExists('turtles')
};
