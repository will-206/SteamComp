// const express = require('express');
// const app = express();
// const session = require('express-session');
// const FirebaseStore = require('connect-firebase')(session);
//
// const firebaseStoreOptions = {
//     // Your FireBase database
//     host: 'console.firebase.google.com/project/steamcomp-8447b/overview'
//     // host: 'my-firebase-app-8576.firebaseio.com',
//     // Secret token you can create for your Firebase database
//     token: 'AIzaSyCetsexO7B0DneiH4BqWTODl-zvk8RQg0w',
//     // How often expired sessions should be cleaned up
//     reapInterval: 600000,
// };
//
// app.use(session({
//     store: new FirebaseStore(firebaseStoreOptions),
//     secret: 'h214hh234nnfasdfkkcas', // Change this to anything else
//     resave: false,
//     saveUninitialized: true
// }));
//
// var OpenIDStrategy = require('passport-openid').Strategy;
// var SteamStrategy = new OpenIDStrategy({
//     // OpenID provider configuration
//     providerURL: 'http://steamcommunity.com/openid',
//     stateless: true,
//     // How the OpenID provider should return the client to us
//     returnURL: 'http://localhost:4000/auth/openid/return',
//     realm: 'http://localhost:4000/',
// },
// // This is the "validate" callback, which returns whatever object you think
// // should represent your user when OpenID authentication succeeds.  You
// // might need to create a user record in your database at this point if
// // the user doesn't already exist.
// function(identifier, done) {
//     // The done() function is provided by passport.  It's how we return
//     // execution control back to passport.
//     // Your database probably has its own asynchronous callback, so we're
//     // faking that with nextTick() for demonstration.
//     process.nextTick(function () {
//         // Retrieve user from Firebase and return it via done().
//         var user = {
//             identifier: identifier,
//             // Extract the Steam ID from the Claimed ID ("identifier")
//             steamId: identifier.match(/\d+$/)[0]
//         };
//         // In case of an error, we invoke done(err).
//         // If we cannot find or don't like the login attempt, we invoke
//         // done(null, false).
//         // If everything went fine, we invoke done(null, user).
//         return done(null, user);
//     });
// });
//
// var passport = require('passport');
// passport.use(SteamStrategy);
//
// passport.serializeUser(function(user, done) {
//     done(null, user.identifier);
// });
//
// passport.deserializeUser(function(identifier, done) {
//     // For this demo, we'll just return an object literal since our user
//     // objects are this trivial.  In the real world, you'd probably fetch
//     // your user object from your database here.
//     done(null, {
//         identifier: identifier,
//         steamId: identifier.match(/\d+$/)[0]
//     });
// });
//
// app.use(passport.initialize());
// app.use(passport.session());
//
// app.post('/auth/openid', passport.authenticate('openid'));
//
// // app.get('/auth/openid/return', passport.authenticate('openid', {
// //    'successRedirect': '/',
// //    'failureRedirect': '/auth/failure'
// // }));
//
// app.get('/auth/openid/return', passport.authenticate('openid'),
//     function(request, response) {
//         if (request.user) {
//             response.redirect('/?steamid=' + request.user.steamId);
//         } else {
//             response.redirect('/?failed');
//         }
// });
//
// app.post('/auth/logout', function(request, response) {
//     request.logout();
//     // After logging out, redirect the user somewhere useful.
//     // Where they came from or the site root are good choices.
//     response.redirect(request.get('Referer') || '/')
// });
//
// app.get('/', function(request, response) {
//     response.write('<!DOCTYPE html>')
//     if (request.user) {
//         response.write(request.session.passport &&
//             JSON.stringify(request.user) || 'None');
//         response.write('<form action="/auth/logout" method="post">');
//         response.write('<input type="submit" value="Log Out"/></form>');
//     } else {
//         if (request.query.steamid) {
//             response.write('Not logged in.');
//         }
//         response.write('<form action="/auth/openid" method="post">');
//         response.write(
//             '<input name="submit" type="image" src="http://steamcommunity-a.' +
//             'akamaihd.net/public/images/signinthroughsteam/sits_small.png" ' +
//             'alt="Sign in through Steam"/></form>');
//     }
//     response.send();
// });
