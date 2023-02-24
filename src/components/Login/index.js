import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {userId: '', password: '', errorMsg: '', showMsg: false}

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 50})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showMsg: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)

    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getUserId = event => {
    this.setState({userId: event.target.value})
  }

  render() {
    const {userId, password, errorMsg, showMsg} = this.state
    const token = Cookies.get('jwt_token')

    return (
      <div className="app">
        <div className="login-card">
          <div className="img-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>

          <div className="form-container">
            <h1>Welcome Back!</h1>
            <form onSubmit={this.submitForm} className="form">
              <label htmlFor="user">User ID</label>
              <input
                type="text"
                id="user"
                onChange={this.getUserId}
                className="input-box"
                value={userId}
              />

              <label htmlFor="pin">PIN</label>
              <input
                type="password"
                id="pin"
                onChange={this.getPassword}
                className="input-box"
                value={password}
              />

              <button type="submit" className="loginBtn">
                Login
              </button>
              {showMsg && <p>{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
