import React from 'react'
import axios from 'axios'

class Registration extends React.Component {
  constructor () {
    super()

    this.state = {
      userName: '',
      userPassword: '',
      defaultStage: 'denial'
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnChange (e, fieldName) {
    const value = e.target.value
    const state = this.state
    state[fieldName] = value
    this.setState(state)
  }

  handleOnSubmit (event) {
    console.log("in HanddleOnSubmit thingy")
    event.preventDefault()
    axios.post(`/api/users`, {user: {username: this.state.userName, password: this.state.userPassword, stage: this.state.defaultStage}})
    .then(({data}) => {
      console.log(data)
      this.setState({userName: '', userPassword: ''})
      this.props.updateAuth(data.token, data.user)
    })
    .catch((error) => { console.log('Error in creating a new journal entry.', error) })
  }

  render () {
    return (
      <div>
        <h2>Registration</h2>
        <form className='registration' onSubmit={this.handleOnSubmit}>
          <input type='text' placeholder='Username' onChange={(e) => this.handleOnChange(e, 'userName')} />
          <input type='password' placeholder='Password' onChange={(e) => this.handleOnChange(e, 'userPassword')} />
          <p>Take a quiz to determine your stage</p>
          <ol>
            <li>Denial</li>
            <li>Anger</li>
            <li>Bargaining</li>
            <li>Depression</li>
            <li>Acceptance</li>
          </ol>
          <p>Or choose a stage to get started</p>
          <span className='set-own-stage'>
            <button type='dropdown' value='set-own-stage'>Set Your Stage</button>
          </span>
          <button type='submit' value='Register'>Submit</button>
        </form>
      </div>
    )
  }
}

export default Registration
