import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import * as FontAwesome from 'react-icons/lib/fa';

class Registration extends React.Component {
  constructor () {
    super()

    this.state = {
      userName: '',
      userPassword: '',
      stage: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleChange (e, fieldName) {
    const value = e.target.value
    const state = this.state
    state[fieldName] = value
    this.setState(state)
  }

  handleOnSubmit (event) {
    event.preventDefault()
    axios.post(`/api/users`, {user: {username: this.state.userName, password: this.state.userPassword, stage: this.state.stageId}})
    .then(({data}) => {
      console.log(data)
      this.setState({userName: '', userPassword: '', stage: ''})
      this.props.handleLogin(data.token, data)
      this.props.history.push(`/profile/${data.id}`)
    })
    .catch((error) => { console.log('Error in creating a new user.', error) })
  }

  render () {
    return (
      <div className='registration-container'>
        <h2 className='registration-text'>Registration</h2>

        <form className='registration-form' onSubmit={this.handleOnSubmit}>
          <p className='field'>
            <input type='text' placeholder='Username' onChange={(e) => this.handleChange(e, 'userName')} />
            <FontAwesome.FaUser className='registration-icon' />
          </p>
          <p className='field'>
            <input type='password' placeholder='Password' onChange={(e) => this.handleChange(e, 'userPassword')} />
            <FontAwesome.FaLock className='registration-icon' />
          </p>
          <label htmlFor='select-stage'>Select your stage</label><br /><br />
          <select id='select-stage' value={this.state.stageId} name="stage" onChange={(e) => this.handleChange(e, 'stageId')}>
              <option value='1'>Denial</option>
              <option value='2'>Anger</option>
              <option value='3'>Bargaining</option>
              <option value='4'>Depression</option>
              <option value='5'>Acceptance</option>
          </select>
          <p className='submit'>
            <button type='submit' value='Register'><FontAwesome.FaArrowRight className='registration-icon' /></button>
          </p>
        </form>

        <div className='quiz-options'>
          <p>If you're unsure of which stage you're currently at, take our quizzes to find out!</p>
          <ul>
            <li><Link className='navigation-text' to='/denial_quiz'>Denial</Link></li>
            <li><Link className='navigation-text' to='/anger_quiz'>Anger</Link></li>
            <li><Link className='navigation-text' to='/bargaining_quiz'>Bargaining</Link></li>
            <li><Link className='navigation-text' to='/depression_quiz'>Depression</Link></li>
            <li><Link className='navigation-text' to='/acceptance_quiz'>Acceptance</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Registration;
