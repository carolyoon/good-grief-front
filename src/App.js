import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import './App.css'
import './User.css'
import './Registration.css';
import './Navigation.css';
import './Home.css';
import './Quiz.css';
import './DenialPage.css';
import './Chat.css';

import AcceptanceQuiz from './components/AcceptanceQuiz'
import AngerQuiz from './components/AngerQuiz'
import BargainingQuiz from './components/BargainingQuiz'
import DenialQuiz from './components/DenialQuiz'
import DepressionQuiz from './components/DepressionQuiz'
import Home from './components/Home'
// import NewAdvicePostForm from './components/NewAdvicePostForm'
import Login from './components/Login'
import ChatHistory from './components/ChatHistory'
import Registration from './components/Registration'
import User from './components/User'
import Anger from './components/Anger'
import Denial from './components/Denial'
import Depression from './components/Depression'
import Bargaining from './components/Bargaining'
import Acceptance from './components/Acceptance'

class App extends Component {
  constructor () {
    super()

    this.state = {
      authToken: window.localStorage.getItem('authToken'),
      currentUser: null
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.updateCurrentUser = this.updateCurrentUser.bind(this)
  }

  updateCurrentUser(newCurrentUserData){
    if(newCurrentUserData){
      // if newCurrentUserData is an object, merge the data
      axios.put(`/api/users/${this.state.currentUser.id}`, {user: newCurrentUserData})
      const currentUser = this.state.currentUser || {}
      const newCurrentUser = Object.assign(currentUser, newCurrentUserData)
      this.setState({ currentUser: newCurrentUser })
    } else {
      // if not, just set it
      this.setState({ currentUser: newCurrentUserData })
    }
  }

  componentDidMount () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    this.handleLogin(this.getFromStorage('authToken'), user)
  }

  getFromStorage(key){
    try {
      return JSON.parse(window.localStorage.getItem(key))
    } catch (e) {
      return window.localStorage.getItem(key)
    }
  }

  setInStorage(key, value){
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  handleLogin (token, user) {
    const authToken = this.getFromStorage('authToken')
    const userId = this.getFromStorage('userId')
    if (authToken !== null) {
      axios.post(`/api/sessions/refresh`, {session: {user_id: userId, token: authToken}})
      .then(({data}) => {
        this.setState({authToken: data.token, currentUser: data})
        this.setInStorage('authToken', data.token)
        this.setInStorage('userId', data.id)
      })
    .catch((error) => { console.log('Error when logging in.', error) })
    } else {
      this.setState({authToken: token})
      if(user !== null) {
        this.setState({currentUser: user})
      }
      this.setInStorage('authToken', token)
      this.setInStorage('userId', user ? user.id : null)
      this.setInStorage('user', user)
    }
  }

  handleLogout () {
    this.setState({authToken: null, currentUser: null})
    window.localStorage.removeItem('currentUser')
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('userId')
  }


  render () {
    return (
      <div>
      <Router>
        <div>

          <div className='navigation-bar'>
            <Link className='navigation-text' to='/'><img className='image' height='190' width='190' src={require('./GoodGriefLogo.png')} /></Link>
            <Link className='navigation-text' to='/'>Home</Link>
            <a className='navigation-text' href={'https://github.com/carolyoon/good-grief-front'} target='_blank'>About</a>
            { !this.state.authToken &&
              <Link className='navigation-text' to='/registration'>Register</Link>}
            { !this.state.authToken &&
              <Link className='navigation-text' to='/login'>Login</Link>}
            { this.state.authToken &&
              <Link className='navigation-text' to='/' onClick={this.handleLogout}>Logout</Link>}
            { this.state.authToken && this.state.currentUser &&
              <Link className='navigation-text' to={`/profile/${this.state.currentUser.id}`}>Profile</Link>}
          </div>

          <Switch>
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/advice' component={NewAdvicePostForm} /> */}
            <Route exact path='/registration' render={(props) => (
              <Registration
                {...props}
                authToken={this.state.authToken}
                handleLogin={this.handleLogin}
              />
             )}
            />
            <Route exact path='/login' render={(props) => (
              <Login
                {...props}
                authToken={this.state.authToken}
                handleLogin={this.handleLogin}
              />
             )}
            />
            <Route path='/profile/:id' render={(props) => (
              <User
               {...props}
               currentUser={this.state.currentUser}
              />
              )}
            />
            <Route exact path='/denial' component={Denial} />
            <Route exact path='/anger' component={Anger} />
            <Route exact path='/bargaining' component={Bargaining} />
            <Route exact path='/depression' component={Depression} />
            <Route exact path='/acceptance' component={Acceptance} />
            <Route exact path='/denial_quiz' render={(props) => (
              <DenialQuiz
                {...props}
                currentUser={this.state.currentUser}
                updateCurrentUser={this.updateCurrentUser}
                />
              )}
            />
            <Route exact path='/bargaining_quiz' render={(props) => (
              <BargainingQuiz
                {...props}
                currentUser={this.state.currentUser}
                updateCurrentUser={this.updateCurrentUser}
                />
              )}
            />
            <Route exact path='/depression_quiz' render={(props) => (
              <DepressionQuiz
                {...props}
                currentUser={this.state.currentUser}
                updateCurrentUser={this.updateCurrentUser}
                />
              )}
            />
            <Route exact path='/acceptance_quiz' render={(props) => (
              <AcceptanceQuiz
                {...props}
                currentUser={this.updateCurrentUser}
                updateCurrentUser={this.updateCurrentUser}
              />
            )}
          />
            <Route exact path='/anger_quiz' render={(props) => (
              <AngerQuiz
                {...props}
                currentUser={this.state.currentUser}
                updateCurrentUser={this.updateCurrentUser}
                />
              )}
            />
           <Route render={() => <h1>Page not found</h1>} />
         </Switch>

        </div>
      </Router>
    </div>
    )
  }
}

export default App;
