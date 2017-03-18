const router = require('express').Router();
const request = require('request');

router.get('/userInfo', (req, res, next) => {
  console.log('requested userinfo');
  const user = req.query.ID;
  request(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=6BA046BB9CE80B47542106C87D5D3F84&steamids=${user}`, (error, response, body) => {
    if (error) {
      res.send(error)
    }
    res.send(body);
  });
});

router.get('/userFriends', (req, res, next) => {
  console.log('requested userfriends');
  const user = req.query.ID;
  request(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=6BA046BB9CE80B47542106C87D5D3F84&steamid=${user}&relationship=friend`, (error, response, body) => {
    if (error) {
      res.send(error)
    }
    res.send(body);
  });
});

router.get('/games', (req, res, next) => {
  console.log('requested games');
  const user = req.query.ID;
  request(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=6BA046BB9CE80B47542106C87D5D3F84&steamid=${user}&format=json`, (error, response, body) => {
    if (error) {
      res.send(error)
    }
    res.send(body);
  });
})

module.exports = router;
