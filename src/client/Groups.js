import React, { Component } from 'react';
import axios from 'axios';
import { DropdownButton, MenuItem, Button } from 'react-bootstrap';


class Groups extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groups: {},
      newGroup: ''
    }

    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.updateNewGroupName = this.updateNewGroupName.bind(this);
  }

  componentDidMount() {
    this.fetchGroups();
  }

  updateNewGroupName(event) {
    this.setState({newGroup: event.target.value});
  }

  fetchGroups() {
    const id = this.props.userInfo.steamid;
    console.log(id);
    const newGroupObj = {
      name: this.state.newGroup,
      members: this.props.compareIds
    };
    axios.get('/groups', newGroupObj)
    .then((res) => {
      console.log('fetched groups');
      // console.log(res);
      this.setState({groups: res.data});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleCreateGroup() {
    console.log('create group');
    if (this.state.newGroup.trim() === '') {
      console.log('no group name');
      return;
    }
    if (this.props.compareIds.length < 2) {
      console.log('select friends to create group');
      return;
    }
    for (let group in this.state.groups) {
      if (this.state.groups[group].group_name === this.state.newGroup.trim()) {
        console.log('Group ' + this.state.newGroup.trim() + ' already exists');
        return;
      }
    }
    const newGroupObj = {
      name: this.state.newGroup,
      members: this.props.compareIds,

    };
    const groups = this.state.groups;
    groups.push({
      group_name: this.state.newGroup,
      id: this.state.groups.length + 2
    });
    this.setState({groups});
    console.log(newGroupObj);

    axios.post('/groups', newGroupObj)
    .then((res) => {
      console.log(res);
      // this.fetchGroups();
    })
    .catch((err) => {
      console.log(err);
    });
  }



  render() {
    return (
      <div className="Groups">
        <h2>Groups</h2>
        <input type="text"
          placeholder="Group Name"
          value={this.state.newGroupName}
          onChange={this.updateNewGroupName}
        ></input>

        <button onClick={this.handleCreateGroup}>
          + Create Group
        </button>

        {this.state.groups[0] ?
          <div>
            {this.state.groups.map(group => (
              <div className="group" key={group.id}>
                <button name={group.group_name} onClick={this.props.onGroupSelect} >{group.group_name}</button>
                <DropdownButton className="bsButton"
                  bsSize="small" title="" id="sm-nested-dropdown">
                  <MenuItem className="bsMenuItem" eventKey="1">
                    Change Name
                  </MenuItem>
                  <MenuItem className="bsMenuItem" eventKey="2">
                    Update Members
                  </MenuItem>
                  <MenuItem className="bsMenuItem" eventKey="3">
                    Delete
                  </MenuItem>
                </DropdownButton>
              </div>
            ))}
          </div>
          :
          <div></div>
        }
      </div>
    );
  }
}

export default Groups;
