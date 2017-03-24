import React, { Component } from 'react';

class Games extends Component {
  constructor(props) {
    super(props)

    this.state = {
      size: 50,
      search: '',
      multiplayerOnly: false,
      friendsObj: {}
    }
    this.orderBySimilar = this.orderBySimilar.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.onCheck = this.onCheck.bind(this);
    // this.idsToNames = this.idsToNames.bind(this);
  }

  orderBySimilar(a, b) {
    let owners = b.owners.length - a.owners.length;
    if (owners === 0){
      if(b.data.name < a.data.name){
        owners++;
      }
      else if (b.data.name > a.data.name){
        owners--;
      }
    }

    return owners;
  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  onCheck(event){
    this.setState({multiplayerOnly: !this.state.multiplayerOnly});
  }

  // idsToNames(ids) {
  //   console.log(this.state.friendsObj);
  //   // for (let elem in ids) {
  //   //   console.log(ids[elem]);
  //   //   console.log(this.state.friendsObj.[ids[elem]]);
  //   // }
  // }

  // componentDidMount() {
  //   const friendsObj = this.props.friends.reduce((result, elem) => {
  //     result[elem.steamid] = elem.personaname;
  //     return result
  //   }, {})
  //   this.setState({friendsObj})
  //   console.log(friendsObj);
  //   // friendsObj[userInfo.steamid] = userInfo.personaname;
  // }

  render() {
    let filteredResult = this.props.games
    .filter((game)=> game.data)
    .filter((game) => {
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

        <div>
          {filteredResult[0] ?
            <div>
              {filteredResult.map(game => (
                <div key={game.id}>
                  <img src={game.data.header_image}
                  alt={game.data.name}/>
                  {/* <a>{game.data.name}</a> */}
                  <a> {game.owners.length}/{this.props.compareIds.length} </a>
                  {game.data.metacritic
                    ? <a href={game.data.metacritic.url}>Metacritic: {game.data.metacritic.score}/100</a>
                    : <a></a>
                  }
                  {/* <br />
                  {game.owners.map(owner => (
                    <a key={game.owner}>{game.owner}</a>
                  ))} */}
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
