'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('groups', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.string('group_name').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('groups');
};
