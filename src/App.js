import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import './App.css'
import './User.css'
import './Registration.css';
import './Navigation.css';
import './Home.css';

import AcceptanceQuiz from './components/AcceptanceQuiz'
import AngerQuiz from './components/AngerQuiz'
import BargainingQuiz from './components/BargainingQuiz'
import DenialQuiz from './components/DenialQuiz'
import DepressionQuiz from './components/DepressionQuiz'
import Home from './components/Home'
// import NewAdvicePostForm from './components/NewAdvicePostForm'
import Login from './components/Login'
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
  }


  componentDidMount () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    this.handleLogin(window.localStorage.getItem('authToken'), user)
  }

  handleLogin (token, user) {
    if (window.localStorage.getItem('authToken') !== null) {
      axios.post(`/api/sessions/refresh`, {session: {user_id: window.localStorage.getItem('userId'), token: window.localStorage.getItem('authToken')}})
      .then(({data}) => {
        console.log("data:", data)

        this.setState({authToken: data.token, currentUser: data})
        window.localStorage.setItem('authToken', data.token)
        window.localStorage.setItem('userId', data.id)

      })
    .catch((error) => { console.log('Error when logging in.', error) })
    } else {
      this.setState({authToken: token})
      if(user !== null) {
        this.setState({currentUser: user})
      }
      window.localStorage.setItem('authToken', token)
      window.localStorage.setItem('userId', user.id)
      window.localStorage.setItem('user', JSON.stringify(user))
    }
    console.log(user)
  }

  handleLogout () {
    this.setState({authToken: null, currentUser: null})
    window.localStorage.removeItem('currentUser')
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('userId')
  }

  render () {
    return (
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

export default App;
