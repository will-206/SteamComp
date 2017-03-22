const router = require('express').Router();
const request = require('request');

router.get('/userInfo', (req, res, next) => {
  console.log('requested userinfo');
  const user = req.query.ID;
  request(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${user}`, (error, response, body) => {
    if (error) {
      res.send(error)
    }
    res.send(body);
  });
});

router.get('/userFriends', (req, res, next) => {
  console.log('requested userfriends');
  const user = req.query.ID;
  request(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${user}&relationship=friend`, (error, response, body) => {
    if (error) {
      res.send(error)
    }
    res.send(body);
  });
});

router.get('/games', (req, res, next) => {
  console.log('requested games');
  const user = req.query.ID;
  request(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${user}&include_played_free_games=1&format=json`, (error, response, body) => {
    if (error) {
      res.send(error)
    }
    res.send(body);
  });
})

router.get('/gameInfo', (req, res, next) => {
  console.log('requested gameInfo');
  const gameId = req.query.ID;
  request(`http://store.steampowered.com/api/appdetails?appids=${gameId}`, (error, response, body) => {
    if (error) {
      res.send(error)
    }
    res.send(body);
  });
})

module.exports = router;
