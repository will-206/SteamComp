import React from 'react';

function formatLastOnline(lastOnline) {
  const secondsAgo = Math.round(new Date().getTime() / 1000) - lastOnline;
  const minutesAgo = Math.floor(secondsAgo/60);
  const hoursAgo = Math.floor(minutesAgo/60);
  const daysAgo = Math.floor(hoursAgo/60);
  const monthsAgo = Math.floor(daysAgo/30);

  let str = '';
  if (monthsAgo >= 1) {
    str = monthsAgo + ' months';
  }
  else if (daysAgo >= 1) {
    str = daysAgo + ' days';
  }
  else if (hoursAgo >= 1) {
    str = hoursAgo + ' hours';
  }
  else if (minutesAgo >= 1) {
    str = minutesAgo + ' minutes';
  }
  else {
    str = secondsAgo + ' seconds';
  }
  if (str.slice(0,2) === '1 ') {
    str = str.slice(0, -1);
  }
  return str;
}

function formatPersonaState(state, lastOnline) {
  switch(state) {
    case 0: return `Last Online: ${formatLastOnline(lastOnline)} ago`;
    case 1: return "Online";
    case 2: return "Busy";
    case 3: return "Away";
    case 4: return "Snooze";
    case 5: return "Looking to Trade";
    case 6: return "Looking to Play";
  }
}

function onlineFriendCount(friends) {
  console.log(friends);
  let count = 0;
  for (let elem in friends) {
    if (friends[elem].personastate !== 0) {
      count ++;
    }
  }
  return count;
}

function FriendList(props) {
  const { friends, onCheck } = props;
  return (
    <div className="Friends">
      <h2>Friends {onlineFriendCount(friends) + ' Online'}</h2>
      <div>
        {friends[0] ?
          <div>
          { friends.map(friend => (
            <div key={friend.steamid}>
              <input
                type='checkbox'
                name='test'
                value={friend.steamid}
                onChange={onCheck}
              />
              <img src={friend.avatar}></img>
              <a>{friend.personaname}</a>
              <a> {formatPersonaState(friend.personastate, friend.lastlogoff)}</a>
            </div>
          ))
          }
        </div> : 'loading'
        }
      </div>
    </div>
  );
}

export default FriendList;
