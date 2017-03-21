import React, { Component } from 'react';
import axios from 'axios';

class game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameData: {}
    }
    this.getOwnersNames = this.getOwnersNames.bind(this);
  }

  getGame(id){
    axios.get(`/gameInfo?ID=${id}`)
    .then((res) => {
      // console.log(this.props.friends);

      this.setState({gameData: res.data[id].data});
    })
    .catch((err) => {
      console.log(err);
    })
  }
  componentDidMount() {
    this.getGame(this.props.game)
  }
  getOwnersNames() {
    const names = this.props.owners.map((elem) => {
      return this.props.friends[elem];
    })
    return names;
  }

  render() {
    if (this.state.gameData) {
      return (
        <div className="game">
          <img src={this.state.gameData.header_image}></img>
          {/* <a>{this.props.game}</a><br /> */}
          <a>{this.state.gameData.name}</a><br />
          <a> {this.props.owners.length}/{this.props.compareIds.length}</a>
          <a> {this.getOwnersNames()}</a>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default game;
