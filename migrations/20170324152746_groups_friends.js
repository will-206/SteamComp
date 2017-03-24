'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('groups_friends', (table) => {
    table.increments();
    table.integer('group_id')
      .notNullable()
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE')
      .index();
    table.integer('friend_id')
      .notNullable()
      .references('id')
      .inTable('friends')
      .onDelete('CASCADE')
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('groups_friends');
};
