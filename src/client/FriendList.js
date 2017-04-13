import React, { Component } from 'react';

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

class FriendList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  render(){
    const { friends, onCheck, onClearAll, onSelectAll, compareIds, formatPersonaState, formatLastOnline } = this.props;
    return (
      <div className="Friends">
        <h2>{'Friends  '}
          <label>
            {onlineFriendCount(friends) + ' Online'}
          </label>
        </h2>

        <label>
          <span className="glyphicon glyphicon-search"></span>
          <input type="text"
            value={this.state.search}
            onChange={this.updateSearch}
          >
          </input>
        </label>
        <button onClick={onClearAll}>
          Clear Selected
        </button>
        <div id="friendsList">
          {friends[0] ?
            <div>
            { friends
              .filter((friend) => {
                //filter by search
                return friend.personaname
                .toLowerCase()
                .indexOf(this.state.search
                  .toLowerCase()) !== -1;
              })
              .sort(sortTime)
              .sort(sortStatus)
              .map(friend => (
              <div key={friend.steamid} className={`onlineState${friend.personastate}`}>
                {/* <a>{friend.communityvisibilitystate}</a> */}
                {friend.communityvisibilitystate !== 3 ?
                <input
                  type='checkbox'
                  name='friendCheckbox'
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
                <img src={friend.avatar} className="avatar"></img>
                <a className="userName" href={friend.profileurl}>
                  {friend.personaname}
                </a>
                <p> {formatPersonaState(friend.personastate, friend.lastlogoff)}</p>
                {/* <a>{friend.steamid}</a> */}
              </div>
            ))
            }
          </div>
          : friends.length > 0 ?
            <div>0 Results</div>
          :<div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default FriendList;
