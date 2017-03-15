import React, { Component } from 'react';
import axios from 'axios';
// import { browserHistory } from 'react-router';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: {},
      friends: {}
    }

  }

  getUserInfo() {
    const self = this;
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=6BA046BB9CE80B47542106C87D5D3F84&steamids=${this.props.params.userId}`)
    .then(function (res) {
      self.setState({userInfo: res.data.response.players[0]})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getFriendsList() {
    const self = this;
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=6BA046BB9CE80B47542106C87D5D3F84&steamid=${this.props.params.userId}&relationship=friend`)
    .then(function (res) {
      const friendIdList = [];
      for (let friend in res.data.friendslist.friends) {
        friendIdList.push(parseInt(res.data.friendslist.friends[friend].steamid));
      }
      console.log(friendIdList);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    console.log('mounted');
    this.getUserInfo();
    this.getFriendsList();
  }

  render() {
    return (
      <div>
        <a href={this.state.userInfo.avatarmedium}></a>
        <a>
        Welcome, {this.state.userInfo.personaname} </a>
        <a href="api/logout">Logout</a>
      </div>
    );
  }
}

export default Main;
