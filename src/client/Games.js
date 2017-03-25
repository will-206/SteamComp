import React, { Component } from 'react';

class Games extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      multiplayerOnly: false,
      platform: 'any'
    }

    this.orderBySimilar = this.orderBySimilar.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onPlatformChange = this.onPlatformChange.bind(this);
  }

  orderBySimilar(a, b) {
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
    .sort(this.orderBySimilar);

    return (
      <div className="Games">
        <h2>Games</h2>

        <label>
          Search:
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

        <div>
          {filteredResult[0] ?
            <div>
              {filteredResult.map(game => (
                <div key={game.id}>
                  <img src={game.data.header_image}
                  alt={game.data.name}/>
                  <br />
                  <div className="onHover">
                    <a> {game.owners.length}/{this.props.compareIds.length} </a>
                    <a
                      href={`http://store.steampowered.com/app/${game.data.steam_appid}/`}>
                      {game.data.name}
                    </a>
                    <br/>
                    {game.data.is_free
                      ? <a>Free</a>
                      : <div>{game.data.price_overview
                        ? <a>${game.data.price_overview.final/100}</a>
                        : <a></a>
                      }</div>
                    }

                    {game.data.metacritic
                      ? <a href={game.data.metacritic.url}>Metacritic: {game.data.metacritic.score}/100</a>
                      : <a></a>
                    }
                    <div id="platforms">
                      {game.data.platforms.windows
                        ? <a>W</a> : <a></a>}
                      {game.data.platforms.mac
                        ? <a>M</a> : <a></a>}
                      {game.data.platforms.linux
                        ? <a>L</a> : <a></a>}
                    </div>
                    <br />
                    {this.props.compareIds.map(id => (
                      <div key={id}>
                        {!game.owners.includes(id) ?
                          <div>
                            - {friendsObj[id]}
                          </div>
                          :<div></div>
                        }
                      </div>
                    ))}
                    {game.owners.map(owner => (
                      <div key={owner}>
                        + {friendsObj[owner]}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            : this.props.compareIds.length > 1 ? 'loading...' : 'Select at least one friend to compare games with'
          }
        </div>
      </div>
    );
  }
}

export default Games;
