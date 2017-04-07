'use strict';

const environment = process.env.NODE_ENV || 'development';
console.log(process.env.NODE_ENV, environment);
const knexConfig = require('./knexfile.js')[environment];
console.log(knexConfig);
const knex = require('knex')(knexConfig);

module.exports = knex;
