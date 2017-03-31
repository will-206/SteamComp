'use strict';
// const boom = require('boom');
// const jwt = require('jsonwebtoken');
const knex = require('../../../knex');
const router = require('express').Router();

router.post('/groups', (req, res, next) => {
  //group name, members, creator

  //
});

router.get('/groups', (req, res, next) => {
  knex('groups')
  .where('groups.user_id', req.session)
  .then((groups) => {
    console.log(groups);
    res.send(groups);
  })
  .catch((err) => {
    console.log(err);
  });
  //
});
module.exports = router;
