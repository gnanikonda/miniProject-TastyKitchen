import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false,
    errorMsg: 'Please enter a valid Username & Password',
  }

  onUserNameChange = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onUserPassChange = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken)

    const {history} = this.props
    history.replace('/')

    this.setState({username: '', password: '', error: false})
  }

  onFailureLogin = errorMsg => {
    this.setState({error: true, errorMsg})
  }

  onSubmitInput = async event => {
    event.preventDefault()
    const {username, password} = this.state

    if (username === '' || password === '') {
      this.setState({error: true})
    }

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const jwtToken = data.jwt_token

    if (response.ok === true) {
      this.onSuccessLogin(jwtToken)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const {username, password, error, errorMsg} = this.state
    const getclass = error ? 'error' : 'hide-error'
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginmaindiv">
        <div className="div1">
          <div className="logindiv">
            <img
              src="https://res.cloudinary.com/duonr3oqw/image/upload/v1681051096/loginkitchen_ted7lm.jpg"
              className="capImg"
              alt="website logo"
            />
            <h1 className="loginHeading">Tasty Kitchens</h1>
            <h1 className="loginText loginText1">Login</h1>
            <form className="form-control" onSubmit={this.onSubmitInput}>
              <div className="lable-input">
                <label className="labelclass" htmlFor="username">
                  USERNAME
                </label>
                <input
                  id="username"
                  type="text"
                  className="inputClass"
                  onChange={this.onUserNameChange}
                  value={username}
                  placeholder="username"
                />
              </div>
              <div className="lable-input">
                <label className="labelclass" htmlFor="pass">
                  PASSWORD
                </label>
                <input
                  type="text"
                  id="pass"
                  className="inputClass"
                  onChange={this.onUserPassChange}
                  value={password}
                  placeholder="password"
                />
              </div>
              <button className="loginBtn" type="submit">
                Login
              </button>

              <p className={getclass}>{errorMsg}</p>
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/duonr3oqw/image/upload/v1681053339/LoginkitchenImg_khb3hd.jpg"
          alt="website login"
          className="loginImg"
        />
      </div>
    )
  }
}

export default Login
