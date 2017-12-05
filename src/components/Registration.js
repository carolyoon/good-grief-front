import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

class Registration extends React.Component {
  constructor () {
    super()

    this.state = {
      userName: '',
      userPassword: '',
      stage: 'Denial'
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
    axios.post(`/api/users`, {user: {username: this.state.userName, password: this.state.userPassword, stage: this.state.stage}})
    .then(({data}) => {
      console.log(data)
      this.setState({userName: '', userPassword: '', stage: 'Denial'})
      this.props.handleLogin(data.token, data.user)
      this.props.history.push(`/profile/${data.id}`)
    })
    .catch((error) => { console.log('Error in creating a new journal entry.', error) })
  }

  render () {
    return (
      <div>
        <h2>Registration</h2>
        <form className='registration' onSubmit={this.handleOnSubmit}>
          <input type='text' placeholder='Username' onChange={(e) => this.handleChange(e, 'userName')} />
          <input type='password' placeholder='Password' onChange={(e) => this.handleChange(e, 'userPassword')} />
          <div>
          <br /><br />
          <label htmlFor='select-stage'>Select your stage</label><br /><br />
          <select id='select-stage' className="stages-dropdown" name="stageId" onChange={(e) => this.handleChange(e, 'content')}>
              <option value='1'>Denial</option>
              <option value='2'>Anger</option>
              <option value='3'>Bargaining</option>
              <option value='4'>Depression</option>
              <option value='5'>Acceptance</option>
          </select>
          </div>
          <button type='submit' value='Register'>Submit</button>
        </form>
        <div className='quiz-options'>
          <p>If you're unsure of which stage you're currently at, take our quizzes to find out!</p>
          <ul>
            <li><Link className='navigation-text' to='/denial_quiz'>Denial</Link></li>
          </ul>
        </div>

      </div>
    )
  }
}

export default Registration
