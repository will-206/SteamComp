import React, { Component } from 'react';
import Game from './Game';


class Games extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      multiplayerOnly: false,
      platform: 'any',
    }

    this.orderByShared = this.orderByShared.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onPlatformChange = this.onPlatformChange.bind(this);
    // this.onHover = this.onHover.bind(this);

  }

  orderByShared(a, b) {
    let difference = b.owners.length - a.owners.length;
    if (difference === 0){
      if(b.data.name < a.data.name){
        difference++;
      }
      else if (b.data.name > a.data.name){
        difference--;
      }
    }
    return difference;
  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  onCheck(){
    this.setState({multiplayerOnly: !this.state.multiplayerOnly});
  }

  onPlatformChange(event){
    this.setState({platform: event.target.value});
  }

  // onHover(event){
  //   console.log(event);
  //   console.log(event.target.value);
  //   // this.setState({openPanel: game.id});
  // }

  render() {
    const friendsObj = this.props.friends.reduce((result, elem) => {
      result[elem.steamid] = elem.personaname;
      return result
    }, {})
    friendsObj[this.props.userInfo.steamid] = this.props.userInfo.personaname;

    let filteredResult = this.props.games
    .filter((game) => game.data)
    .filter((game) => {
      //filter by platform
      if (this.state.platform === 'any') {
        return true;
      }
      return game.data.platforms[this.state.platform];
    })
    .filter((game) => {
      //remove promotional games
      if (game.data.type === 'advertising') {
        return false;
      }
      //filter out games without multiplayer or co-op if checked
      if (!this.state.multiplayerOnly) {
        return true;
      }
      let multiplayer = false;
      const categories = game.data.categories
      for (let category in categories){
        if (categories[category].description === 'Multi-player' || categories[category].description === 'Co-op') {
          multiplayer = true;
        }
      }
      return multiplayer;
    })
    .filter((game) => {
      //filter by search
      return game.data.name.toLowerCase()
      .indexOf(this.state.search.toLowerCase()) !== -1;
    })
    .sort(this.orderByShared);

    return (
      <div className="Games">
        <h2>Shared Games</h2>

        <label>
          <span className="glyphicon glyphicon-search"></span>
          <input type="text"
            value={this.state.search}
            onChange={this.updateSearch}
          >
          </input>
        </label>

        <label>
          Muliplayer
          <input
            type='checkbox'
            name='multiplayerOnly'
            value={this.state.multiplayerOnly}
            onChange={this.onCheck}
          />
        </label>

        <label>
          Platform
          <select
            name="platform"
            onChange={this.onPlatformChange}
          >
            <option value="any">Any</option>
            <option value="windows">Windows</option>
            <option value="mac">Mac</option>
            <option value="linux">Linux</option>
          </select>
        </label>

        <div id="gamesList">
          {filteredResult[0] ?
            <div>
              {filteredResult.map(game => (
                <Game
                  friendsObj={friendsObj}
                  game={game}
                  compareIds={this.props.compareIds}
                  key={game.id}
                />
              ))}
            </div>
            : this.props.compareIds.length > 1 ?
              this.props.games.length > 0 ?
                <div>0 Results</div>
              :<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            : 'Select at least one friend to compare games with'
          }
        </div>
      </div>
    );
  }
}

export default Games;
