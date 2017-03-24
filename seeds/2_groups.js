'use strict';

exports.seed = function(knex) {
  return knex('groups').del()
    .then(() => {
      return knex('groups').insert([{
        id: 1,
        user_id: 2,
        //steamcomptest
        group_name: 'No friends'
      }, {
        id: 2,
        user_id: 1,
        //finaldestination
        group_name: 'ballers united'
      }, {
        id: 3,
        user_id: 1,
        //finaldestination
        group_name: 'uw'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('groups_id_seq', (SELECT MAX(id) FROM groups));"
      );
    });
};
