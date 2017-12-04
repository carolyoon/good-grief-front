import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';
import './User.css';

import Registration from './components/Registration';
import Home from './components/Home';
import User from './components/User';
import Stage from './components/Stage';
import NewJournalEntryForm from './components/NewJournalEntryForm';
import Goals from './components/Goals';

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
            <Route exact path='/registration' render={(props) => (
              <Registration
                {...props}
                auth_token={this.state.auth_token}
                updateAuthToken={this.updateAuthToken}
              />
            )} />
            <Route exact path='/profile' component={User} />
            <Route exact path='/stage/:stageId' component={Stage} />
            <Route exact path='/denial_quiz' component={DenialQuiz} />
            <Route exact path='/registration' render={(routeProps) => (
              <Registration updateAuthToken={this.updateAuthToken} auth_token={this.state.auth_token} />)} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
