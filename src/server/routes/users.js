'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const router = require('express').Router();

router.post('/users', (req, res, next) => {
  console.log(req);
  knex('users')
  .where('steam_userid', req.body.userid)
  .first()
  .then((row) => {
    if (row) {
      throw boom.create(400, 'userid has already been registered');
    }
    knex('users').insert({
      steam_userid: req.body.userid
    }, '*');
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
