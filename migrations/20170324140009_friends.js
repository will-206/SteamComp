'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('friends', (table) => {
    table.increments();
    table.bigint('steam_userid').unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('friends');
};
