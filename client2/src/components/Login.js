import React from 'react'

const SQLHelper = require('./SQLHelper.js');

export class Login2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      password: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let queryString = "SELECT userName, password FROM customers WHERE"

    queryString += " userName = '" + this.state.userName + "' AND";
    queryString += " password = '" + this.state.password + "'";
    SQLHelper.query(queryString, (data) => {
      if (!data.length) {
        window.alert("wrong username or password")
      } else {
        localStorage.setItem('user', this.state.userName);
        window.location.href = "/";
      }
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className='center'>
          <a href='/'>
            <button className='closebtn'>✖</button>
          </a>
          <h1>Login</h1>
          <form>

            <div className='txt_field'>
              <input
                type='text'
                name='userName'
                value={this.state.userName}
                onChange={this.handleChange}
                required
              />
              <label>Username</label>
            </div>

            <div className='txt_field'>
              <input
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <label>Password</label>
            </div>

            <div className='pass'>Forgot Password?</div>
            <button type='submit' onClick={(event) => {this.handleSubmit(event);}}>Login</button>
            <div className='signup'>
              Don't have a account?<a href="/signup"> Sign up</a>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export function Login() {
  return (
    <React.Fragment>
        <div className='center'>
          <a href='/'>
            <button className='closebtn'>✖</button>
          </a>
          <h1>Login</h1>
          <form method='post'>
            <div className='txt_field'>
              <input type='text' required></input>
              <label>Username</label>
            </div>
            <div className='txt_field'>
              <input type='password' required></input>
              <label>Password</label>
            </div>
            <div className='pass'>Forgot Password?</div>
            <button type='submit'>Login</button>
            <div className='signup'>
              Don't have a account?<a href="/signup"> Sign up</a>
            </div>
          </form>
        </div>
    </React.Fragment>
  )
}
