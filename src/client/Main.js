import React, { Component } from 'react';
import axios from 'axios';
import FriendList from './FriendList';
import Games from './Games';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: {},
      friendsIds: [],
      friendsInfo: [],
      compareIds: [],
      gamesObj: {}
    }

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  getUserInfo() {
    const self = this;
    axios.get(`/userInfo?ID=${this.props.params.userId}`)
    .then((res) => {
      self.setState({userInfo: res.data.response.players[0]})
      self.setState({compareIds: [this.state.userInfo.steamid]})
      self.compareGames();
    })
    .catch((err) => {
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

  componentDidMount() {
    this.getUserInfo();
    this.getFriendsList();
  }

  onCheckboxChange(event) {
    const friendId = event.target.value
    //console.log(friendId);
    const compareIds = this.state.compareIds;
    const checked = compareIds.includes(friendId);

    if (checked) {
      compareIds.splice(compareIds.indexOf(friendId), 1)
    } else {
      compareIds.push(friendId)
    }
    this.setState({compareIds})
    this.compareGames();
  }

  // takes a list of ids, return
  compareGames() {
    const compareIds = this.state.compareIds;
    console.log(compareIds);

    const orderedResult = [];
    for (let elem in compareIds) {
      orderedResult.push([]);
    }

    const promises = compareIds.map((elem) => {
      return axios.get(`/games?ID=${elem}`)
    })
    Promise.all(promises).then((responses) => {
      const gamesObj = {};
      responses.map((games, idx) => {
        games.data.response.games.map((game) => {
          if (gamesObj[game.appid]) {
            gamesObj[game.appid].push(compareIds[idx]);
          } else {
            gamesObj[game.appid] = [compareIds[idx]];
          }
        })
      })
      this.setState({gamesObj})
    })
    .then(() =>{
      for (let key in this.state.gamesObj) {
        const arr = this.state.gamesObj[key];
        orderedResult[orderedResult.length - arr.length].push({key, owners: this.state.gamesObj[key]})
      }
      console.log(orderedResult);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <img src={this.state.userInfo.avatarmedium}></img>
        <a>{this.state.userInfo.personaname} </a>
        <a href="api/logout">Logout</a>

        <FriendList
          friends={this.state.friendsInfo}
          onCheck={this.onCheckboxChange}
        />
        <Games
          userInfo={this.state.userInfo}
          friends={this.state.friendsInfo}
          compareIds={this.state.compareIds}
        />
      </div>
    );
  }
}

export default Main;
