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
  //group name, members, creator

  //
});

router.get('/groups', (req, res, next) => {
  knex('groups')
  .where('groups.user_id', req.query.ID)
  .then((groups) => {
    console.log(groups);
    res.send(groups);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
  //
});
module.exports = router;
