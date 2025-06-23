import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    errorMsgShown: false,
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  loginApp = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const {history} = this.props
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, errorMsgShown: true})
    }
  }

  render() {
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
    const {errorMsg, errorMsgShown} = this.state
    return (
      <div className="login-bg">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form onSubmit={this.loginApp}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={this.changeUsername}
              id="username"
              placeholder="Username"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={this.changePassword}
              id="password"
              placeholder="Password"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {errorMsgShown && <p className="error">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm
