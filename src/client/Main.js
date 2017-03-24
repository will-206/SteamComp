import React, { Component } from 'react';
import axios from 'axios';
import FriendList from './FriendList';
import Games from './Games';
import Groups from './Groups';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: {},
      friendsIds: [],
      friendsInfo: [],
      compareIds: [],
      gamesObj: {},
      gamesArr: [],
      orderedResult: []
    }

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
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
    this.setState({gamesArr:[]});
    const friendId = event.target.value
    const compareIds = this.state.compareIds;
    const checked = compareIds.includes(friendId);

    if (checked) {
      compareIds.splice(compareIds.indexOf(friendId), 1)
    } else {
      compareIds.push(friendId)
    }
    this.setState({compareIds})
    localStorage.setItem('compareIds', compareIds);
    this.compareGames();
  }

  compareGames() {
    this.setState({
      compareIds: localStorage.getItem('compareIds').split(',') || []
    })
    const compareIds = this.state.compareIds;
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
      const gamesInfoPromises = Object.keys(gamesObj).filter(atLeastOne).map(ele => {
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

  render() {
    return (
      <div>
        <img src={this.state.userInfo.avatarmedium}></img>
        <a>{this.state.userInfo.personaname} </a>
        <a>{}</a>
        <a
          href="api/logout"
          onClick={this.onLogOut}
        >Logout</a>

        <FriendList
          friends={this.state.friendsInfo}
          compareIds={this.state.compareIds}
          onCheck={this.onCheckboxChange}
        />
        <Groups />
        <Games
          userInfo={this.state.userInfo}
          friends={this.state.friendsInfo}
          compareIds={this.state.compareIds}
          games={this.state.gamesArr}
        />
      </div>
    );
  }
}

export default Main;
