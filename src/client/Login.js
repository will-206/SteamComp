import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn() {
    console.log('login');
  }

  render() {
    return (
      <div>
        <a href="api/auth/steam">
          <img
            className="sign-in-button"
            onClick={this.handleSignIn}
            src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png"
          />
        </a>
      </div>
    );
  }
}

export default Login;
