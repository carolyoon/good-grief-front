import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import './App.css'
import './User.css'

import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/Home'
import User from './components/User'

import DenialQuiz from './components/DenialQuiz'
import AngerQuiz from './components/AngerQuiz'
import BargainingQuiz from './components/BargainingQuiz'
import AcceptanceQuiz from './components/AcceptanceQuiz'
import DepressionQuiz from './components/DepressionQuiz'

import GoalList from './components/GoalList'
import JournalEntryList from './components/JournalEntryList'
import NewJournalEntryForm from './components/NewJournalEntryForm'
import NewGoalForm from './components/NewGoalForm'
// import Goals from './components/Goals'
import Stage from './components/Stage'
import NewAdvicePostForm from './components/NewAdvicePostForm'

class App extends Component {
  constructor () {
    super()

    this.state = {
      authToken: window.localStorage.getItem('authToken'),
      currentUser: null
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (token, user) {
    this.setState({authToken: token, currentUser: user})
  }

  handleLogout () {
    this.setState({authToken: null, currentUser: null})
  }

  render () {
    return (
      <Router>
        <div>
          <div className='navigation-bar'>
            <Link className='navigation-text' to='/'>Home</Link>
            { !this.state.authToken &&
              <Link className='navigation-text' to='/registration'>Register</Link>}
            { !this.state.authToken &&
              <Link className='navigation-text' to='/login'>Login</Link>}
            { this.state.authToken &&
              <Link className='navigation-text' to='/' onClick={this.handleLogout}>Logout</Link>}
            { this.state.authToken &&
              <Link className='navigation-text' to='/profile/:id'>My Profile</Link>}
            { this.state.authToken &&
              <Link className='navigation-text' to='/stage'>Stages</Link>}
          </div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/advice' component={NewAdvicePostForm} />
            <Route exact path='/registration' render={(props) => (
              <Registration
                {...props}
                authToken={this.state.authToken}
                handleLogin={this.handleLogin}
              />
            )} />
            <Route exact path='/login' render={(props) => (
              <Login
                {...props}
                authToken={this.state.authToken}
                handleLogin={this.handleLogin}
              />
            )} />
            <Route path='/profile/:id' component={(props) => <User {...props} currentUser={this.state.currentUser} />} />
            <Route exact path='/stage' component={Stage} />
            <Route exact path='/denial_quiz' component={DenialQuiz} />
            <Route exact path='/bargaining_quiz' component={BargainingQuiz} />
            <Route exact path='/depression_quiz' component={DepressionQuiz} />
            <Route exact path='/acceptance_quiz' component={AcceptanceQuiz} />
            <Route exact path='/anger_quiz' component={AngerQuiz} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}


export default App
