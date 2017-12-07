import React from 'react';
import axios from 'axios';

import * as FontAwesome from 'react-icons/lib/fa';

class Login extends React.Component {
  constructor () {
    super();

    this.state = {
      userName: '',
      userPassword: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
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
      this.props.handleLogin(data.token, data)
      this.props.history.push(`/profile/${data.id}`)
    })
    .catch((error) => { console.log('Error when logging in.', error) })
  }

  render () {
    return (
      <div className='login-container'>
        <h2 className='registration-text'>Login</h2>

        <form className='registration-form' onSubmit={this.handleOnSubmit}>
          <p className='field'>
            <input type='text' placeholder='Username' onChange={(e) => this.handleOnChange(e, 'userName')} />
            <FontAwesome.FaUser className='registration-icon' />
          </p>
          <p className='field'>
            <input type='password' placeholder='Password' onChange={(e) => this.handleOnChange(e, 'userPassword')} />
            <FontAwesome.FaLock className='registration-icon' />
          </p>
          <p className='submit'>
            <button type='submit' value='Login'><FontAwesome.FaArrowRight className='registration-icon' /></button>
          </p>
        </form>
      </div>
    )
  }
}

export default Login;
