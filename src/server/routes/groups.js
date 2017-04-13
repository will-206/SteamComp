'use strict';
// const boom = require('boom');
// const jwt = require('jsonwebtoken');
const knex = require('../../../knex');
const router = require('express').Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(403).send({authenticated:false});
}

router.post('/groups', ensureAuthenticated, (req, res, next) => {
  console.log('post/groups');
  req.body.owner = req.body.members.shift();
  // console.log(req.body);
  //group name, members, creator
  knex('users')
  .select('id')
  .where('steam_userid', req.body.owner)
  .first()
  .then((id) => {
    console.log('id');
    console.log(id.id);
    return knex('groups').insert({
      user_id: id.id,
      group_name: req.body.name
    }, '*');
  })
  .then((groupId) => {
    console.log(groupId);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

router.get('/groups', ensureAuthenticated, (req, res, next) => {
  console.log('get/groups');
  console.log(req.body);
  knex('groups')
  .select('*')
  .where('groups.user_id', '1')//replace with userId
  .then((groups) => {

    // console.log(groups);
    res.send(groups);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});
module.exports = router;
