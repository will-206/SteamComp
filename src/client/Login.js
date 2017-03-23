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
        <p>Quickly find games you have in common with your friends</p>

        <a href="api/auth/steam">
          <img
            className="sign-in-button"
            onClick={this.handleSignIn}
            src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png"
          />
        </a>

        <p>The Steam Web API is limited to only public information. If you're having trouble, try setting your <a href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401">profile setting to public</a></p>
      </div>
    );
  }
}

export default Login;
