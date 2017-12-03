import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';

import Registration from './components/Registration';
import Home from './components/Home';
import User from './components/User';
import NewJournalEntryForm from './components/NewJournalEntryForm';

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
      <Router>
        <div>

          <div className='navigation-bar'>
            <Link className='navigation-text' to='/'>Home</Link>
          </div>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={User} />
            <Route path='/registration' render={(routeProps) => (
              <Registration updateAuthToken={this.updateAuthToken} auth_token={this.state.auth_token} />)} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
