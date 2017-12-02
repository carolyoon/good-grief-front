import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import MissionStatement from './MissionStatement';
import Registration from './Registration';


class App extends Component {

  constructor() {
    super()

    this.state = {
      auth_token: window.localStorage.getItem('auth_token')
    }

    this.updateAuthToken = this.updateAuthToken.bind(this)
  }

  updateAuthToken (current_auth) {
    this.setState({auth_token: current_auth})
  }

  render() {
    return (
      <div className="App">
        <Header />
        <MissionStatement />
        <Registration 
            auth_token={this.state.auth_token}
            updateAuthToken={this.updateAuthToken}
        />
      </div>
    );
  }
}

export default App;
