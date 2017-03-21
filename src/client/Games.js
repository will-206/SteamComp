import React from 'react';
import Game from './Game';

function Games(props) {
  const { games, compareIds, friends, userInfo } = props;
  const size = 50;

  const friendsObj = friends.reduce((result, elem) => {
    result[elem.steamid] = elem.personaname;
  return result
  }, {})
  friendsObj[userInfo.steamid] = userInfo.personaname;

  console.log(games);
  const mergedGames = [].concat.apply([], games);
  console.log(mergedGames);
  return (
    <div className="Games">
      <h2>Games</h2>
      <div>
        {mergedGames ?
          <div>
            {mergedGames.slice(0, size).map(game => (
              <div key={game.key}>
                <Game
                  game={game.key}
                  owners={game.owners}
                  friends={friendsObj}
                  compareIds={compareIds}
                />
              </div>
            ))
            }
          </div> :'loading'
        }
      </div>
    </div>
  );
}

export default Games;
