import React from 'react';

function onlineFriendCount(friends) {
  let count = 0;
  for (let elem in friends) {
    if (friends[elem].personastate !== 0) {
      count ++;
    }
  }
  return count;
}

function sortStatus(a, b){
  return b.personastate - a.personastate;
}

function sortTime(a, b){
  return b.lastlogoff - a.lastlogoff;
}

function FriendList(props) {
  const { friends, onCheck, onClearAll, onSelectAll, compareIds, formatPersonaState, formatLastOnline } = props;
  return (
    <div className="Friends">
      <h2>Friends {onlineFriendCount(friends) + ' Online'}</h2>
      {/* <button onClick={onSelectAll}>
        Select All
      </button> */}
      <button onClick={onClearAll}>
        Clear Selected
      </button>
      <div>
        {friends[0] ?
          <div>
          { friends.sort(sortTime)
            .sort(sortStatus)
            .map(friend => (
            <div key={friend.steamid}>
              {/* <a>{friend.communityvisibilitystate}</a> */}
              {friend.communityvisibilitystate !== 3 ?
              <input
                type='checkbox'
                name='friendCheckbox'
                // value={friend.steamid}
                // onChange={onCheck}
                // checked={compareIds.includes(friend.steamid)}
                disabled="disabled"
                title='Profile is Private'
              />
              :
              <input
                type='checkbox'
                name='friendCheckbox'
                value={friend.steamid}
                onChange={onCheck}
                checked={compareIds.includes(friend.steamid)}
              />
              }
              <img src={friend.avatar}></img>
              <a href={friend.profileurl}>{friend.personaname}</a>
              <a> {formatPersonaState(friend.personastate, friend.lastlogoff)}</a>
            </div>
          ))
          }
        </div> : 'loading...'
        }
      </div>
    </div>
  );
}

export default FriendList;
