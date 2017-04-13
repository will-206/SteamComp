'use strict';

exports.seed = function(knex) {
  return knex('friends').del()
    .then(() => {
      return knex('friends').insert([{
        id: 1,
        steam_userid: '76561198060677362'
        //noitems
      }, {
        id: 2,
        steam_userid: '76561198052658466'
        //foxonly
      }, {
        id: 3,
        steam_userid: '76561198030826265'
        //cascadia
      }, {
        id: 4,
        steam_userid: '76561198042767203'
        //ninjalorian
      }, {
        id: 5,
        steam_userid: '76561198098130417'
        //snaketaint
      }, {
        id: 6,
        steam_userid: '76561198043599503'
        //carlosbandito
      }, {
        id: 7,
        steam_userid: '76561198104648122'
        //gothamshadow69
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('friends_id_seq', (SELECT MAX(id) FROM friends));"
      );
    });
};
