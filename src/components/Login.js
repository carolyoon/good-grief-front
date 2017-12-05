import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  constructor () {
    super()

    this.state = {
      userName: '',
      userPassword: ''
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
    event.preventDefault()
    axios.post(`/api/sessions`, {session: {username: this.state.userName, password: this.state.userPassword}})
    .then(({data}) => {
      console.log(data)
      this.setState({userName: '', userPassword: ''})
      this.props.updateAuth(data.token, data)
      this.props.history.push(`/profile/${data.id}`)
    })
    .catch((error) => { console.log('Error when logging in.', error) })
  }

  render () {
    return (
      <div>
        <h2>Login</h2>
        <form className='login' onSubmit={this.handleOnSubmit}>
          <input type='text' placeholder='Username' onChange={(e) => this.handleOnChange(e, 'userName')} />
          <input type='password' placeholder='Password' onChange={(e) => this.handleOnChange(e, 'userPassword')} />
          <button type='submit' value='Login'>Login</button>
        </form>
      </div>
    )
  }
}

export default Login
