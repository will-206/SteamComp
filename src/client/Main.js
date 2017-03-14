import React, { Component } from 'react';
// import axios from 'axios';
// import { browserHistory } from 'react-router';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <a>Welcome, name here </a>
        <a href="logout">Logout</a>
      </div>
    );
  }
}

export default Main;
