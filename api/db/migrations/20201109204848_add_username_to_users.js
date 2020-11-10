exports.up = async (knex) => {
  await knex.schema.table('users', (t) => {
    t.string('username');
  })
};

exports.down = async (knex) => {
  await knex.schema.t('users', (t) => {
    t.dropColumn('username');
  })
};
