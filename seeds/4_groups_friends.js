'use strict';

exports.seed = function(knex) {
  return knex('groups_friends').del()
    .then(() => {
      return knex('groups_friends').insert([{
        id: 1,
        group_id: 2,
        friend_id: 1
      }, {
        id: 2,
        group_id: 2,
        friend_id: 2
      }, {
        id: 3,
        group_id: 2,
        friend_id: 3
      }, {
        id: 4,
        group_id: 3,
        friend_id: 4
      }, {
        id: 5,
        group_id: 3,
        friend_id: 5
      }, {
        id: 6,
        group_id: 3,
        friend_id: 6
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('groups_friends_id_seq', (SELECT MAX(id) FROM groups_friends));"
      );
    });
};
