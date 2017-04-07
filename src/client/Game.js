import React from 'react';
import { Panel } from 'react-bootstrap';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  render() {
    const { game, compareIds, friendsObj } = this.props;
    return (
      <div
        onMouseEnter={()=> this.setState({ hover: true })}
        onMouseLeave={()=> this.setState({ hover: false })}
      >
        <img src={game.data.header_image} alt={game.data.name}
        />
        <a className="ownerFraction">
          {game.owners.length}/{compareIds.length}
        </a>
        <br />
        {this.state.hover ?
        <div
          className="gameInfo">
          <a
            href={`http://store.steampowered.com/app/${game.data.steam_appid}/`}>
            {game.data.name}
          </a>
          {game.data.is_free
            ? <div><p>Free</p></div>
            : <div>{game.data.price_overview
              ? <p>${game.data.price_overview.final/100}</p>
              : <p></p>
            }</div>
          }

          <div id="platforms">
            {game.data.platforms.windows
              ? <i className="fa fa-windows"
                aria-hidden="true"></i>
                : <i></i>}
            {game.data.platforms.mac
              ? <i className="fa fa-apple"
                aria-hidden="true"></i>
                : <i></i>}
            {game.data.platforms.linux
              ? <i className="fa fa-steam" aria-hidden="true"></i>
                : <i></i>}
          </div>
          {game.data.metacritic
            ? <a className="metaScore" href={game.data.metacritic.url}>Metacritic: {game.data.metacritic.score}/100</a>
            : <a></a>
          }
          <br />
          {this.props.compareIds.map(id => (
            <div key={id}>
              {!game.owners.includes(id) ?
                <div className="nonOwner">
                  {friendsObj[id]}
                </div>
                :<div></div>
              }
            </div>
          ))}
          {game.owners.map(owner => (
            <div className="owner" key={owner}>
              {friendsObj[owner]}
            </div>
          ))}
        </div>
        : <div></div>
      }
      </div>
    )
  }
}


export default Game;
