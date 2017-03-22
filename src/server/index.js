import compression from 'compression';
import express from 'express';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';

const app = express();
const passport = require('passport');
const util = require('util');
const session = require('express-session');
const SteamStrategy = require('passport-steam').Strategy;
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const morgan = require('morgan');


app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: `https://steamcomp.herokuapp.com/api/auth/steam/return`,
    realm: `https://steamcomp.herokuapp.com:${WEB_PORT}/`,
    apiKey: process.env.STEAM_API_KEY
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../../public'));

app.use(require('./routes/userInfo'));

//steam api
app.get('/main/api/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

app.get('/api/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/login' }
));

app.get('/api/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user);
    console.log(req.user._json.steamid);
    console.log(req.user.id);

    res.redirect('/main/' + req.user.id);
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

app.get('*', (req, res) => {
  res.send(renderApp(APP_NAME));
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
