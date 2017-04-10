import React, { Component } from 'react';

class Groups extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }

    this.handleCreateGroup = this.handleCreateGroup.bind(this)
  }


  handleCreateGroup() {
    console.log('create group');
  }

  render() {
    return (
      <div className="Groups">
        <h2>Groups</h2>
        <input type="text"
          placeholder="Group Name"
          // value={this.state.search}
          // onChange={this.updateSearch}
          >
        </input>

        <button onClick={this.handleCreateGroup}>
          + Create Group
        </button>

      </div>
    );
  }
}

export default Groups;
