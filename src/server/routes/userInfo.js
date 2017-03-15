const express = require('express')
const router = express.Router()
const request = require('express')

// router.get('/userInfo', (req, res, next) => {
//   request('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=6BA046BB9CE80B47542106C87D5D3F84&steamids=76561198074663437'), (error, response, body) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(body);
//     return body;
//   }
// });

module.exports = router;
