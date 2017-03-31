import React, { Component } from 'react';
import { browserHistory } from 'react-router';
// import '../../public/css/styles.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <header>
          <h1>SteamComp</h1>
        </header>
        { this.props.children }
        <footer></footer>
      </div>
    );
  }
}

export default App;
