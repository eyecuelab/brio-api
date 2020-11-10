exports.up = async (knex) => {
  await knex.schema.table('users', (t) => {
    t.dropColumn('first_name');
    t.dropColumn('last_name');
  });
};

exports.down = async (knex) => {
  await knex.schema.table('users', (t) => {
    t.string('first_name');
    t.string('last_name');
  });
};
