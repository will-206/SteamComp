import React, { Component } from 'react';

class Groups extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
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

        <button>+ Create Group</button>
      </div>
    );
  }
}

export default Groups;
