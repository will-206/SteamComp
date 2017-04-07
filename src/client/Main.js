import React, { Component } from 'react';
import axios from 'axios';
import FriendList from './FriendList';
import Games from './Games';
import Groups from './Groups';
import { Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';



class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: {},
      friendsIds: [],
      friendsInfo: [],
      compareIds: [],
      gamesObj: {},
      gamesArr: []
    }

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onClearAll = this.onClearAll.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.formatPersonaState = this.formatPersonaState.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.getFriendsList();
  }

  getUserInfo() {
    const self = this;
    console.log(this.props.params.userId)
    axios.get(`/userInfo?ID=${this.props.params.userId}`)
    .then((res) => {
      console.log(res);
      self.setState({userInfo: res.data.response.players[0]})
      self.setState({compareIds: [this.state.userInfo.steamid]})
      self.compareGames();
    })
    .catch((err) => {
      // if not auth, redirect
      browserHistory.push('/login');
      console.log(err);
    })
  }

  getFriendsList() {
    const self = this;
    axios.get(`/userFriends?ID=${this.props.params.userId}`)
    .then(function (res) {
      const friendsIds = [];
      for (let friend in res.data.friendslist.friends) {
        friendsIds.push(res.data.friendslist.friends[friend].steamid);
      }
      self.setState({friendsIds})
      self.getFriendsInfo(friendsIds);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getFriendsInfo(ids) {
    const self = this;
    axios.get(`/userInfo?ID=${this.state.friendsIds}`)
    .then((res) => {
      res.data.response.players.sort(function(a, b){
        return a.personaname > b.personaname
      });
      self.setState({friendsInfo: res.data.response.players})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  onCheckboxChange(event) {
    this.setState({gamesArr:[]});
    const friendId = event.target.value
    const compareIds = this.state.compareIds;
    const checked = compareIds.includes(friendId);

    if (checked) {
      compareIds.splice(compareIds.indexOf(friendId), 1)
    } else {
      compareIds.push(friendId)
    }
    // this.setState({compareIds})
    localStorage.setItem('compareIds', compareIds);
    this.compareGames();
  }

  onClearAll() {
    localStorage.removeItem('compareIds');
    this.setState({
      compareIds: [this.state.userInfo.steamid],
      gamesArr: []
    });
  }

  onSelectAll() {
    console.log('select all');
    this.setState({
      compareIds: [this.state.friendsIds]
    });
    localStorage.setItem('compareIds', [this.state.friendsIds]);
    this.compareGames();
  }

  compareGames() {
    console.log('comparing');
    if (localStorage.getItem('compareIds')){
      this.setState({
        compareIds: localStorage.getItem('compareIds').split(',')
      })
    }
    const compareIds = this.state.compareIds;
    console.log(compareIds);
    // console.log(localStorage.getItem('compareIds'));

    const promises = compareIds.map((elem) => {
      return axios.get(`/games?ID=${elem}`)
    })
    Promise.all(promises).then((responses) => {
      const gamesObj = {};
      responses.map((games, idx) => {
        games.data.response.games.map((game) => {
          if (gamesObj[game.appid]) {
            gamesObj[game.appid].owners.push(compareIds[idx]);
          } else {
            gamesObj[game.appid] = { owners: [compareIds[idx]] };
          }
        })
      })
      return gamesObj;
    })
    .then((gamesObj) =>{
      function atLeastOne(elem){
        return gamesObj[elem].owners.length > 1;
      }
      const gamesInfoPromises = Object.keys(gamesObj)
      .filter(atLeastOne)
      .map(ele => {
        return this.getGameInfo(ele, gamesObj[ele].owners);
      })

      return Promise.all(gamesInfoPromises);
    })
    .then((games) => {
      this.setState({gamesArr:games})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getGameInfo(id, owners) {
    return new Promise((resolve,reject) => {
      axios.get(`/gameInfo?ID=${id}`)
      .then((res) => {
        const data = res.data[id].data;
        resolve({
          id:id,
          owners:owners,
          data : data,
          err: null
        });
      }).
      catch((err) => {
        console.log(err, id);
        resolve({
          id:id,
          owners:owners,
          data : null,
          err: err
        })
      });
    })
  }

  onLogOut() {
    localStorage.clear();
  }

  formatLastOnline(lastOnline) {
    const secondsAgo = Math.round(new Date().getTime() / 1000) - lastOnline;
    const minutesAgo = Math.floor(secondsAgo/60);
    const hoursAgo = Math.floor(minutesAgo/60);
    const daysAgo = Math.floor(hoursAgo/24);
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

  formatPersonaState(state, lastOnline) {
    switch(state) {
      case 0: return `Last Online: ${this.formatLastOnline(lastOnline)} ago`;
      case 1: return "Online";
      case 2: return "Busy";
      case 3: return "Away";
      case 4: return "Snooze";
      case 5: return "Looking to Trade";
      case 6: return "Looking to Play";
    }
  }

  render() {
    return (
      <div>
        <div className={`onlineState${this.state.userInfo.personastate}`}>

          <img src={this.state.userInfo.avatarmedium} className="avatar"></img>
          <a href={this.state.userInfo.profileurl}>{this.state.userInfo.personaname} </a>
          <p>{this.formatPersonaState(this.state.userInfo.personastate, this.state.userInfo.lastlogoff)}</p>
          <button
            href="api/logout"
            onClick={ this.onLogOut}
          >Logout</button>
        </div>

        <Grid>
          <Row>
            <Col xs={4}>
              <FriendList
                friends={this.state.friendsInfo}
                compareIds={this.state.compareIds}
                onCheck={this.onCheckboxChange}
                onClearAll={this.onClearAll}
                onSelectAll={this.onSelectAll}
                formatPersonaState={this.formatPersonaState}
                formatLastOnline={this.formatLastOnline}
              />
              <Groups />
            </Col>
            <Col xs={8}>
              <Games
                userInfo={this.state.userInfo}
                friends={this.state.friendsInfo}
                compareIds={this.state.compareIds}
                games={this.state.gamesArr}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Main;
