import React, {useState} from 'react'

const SQLHelper = require('./SQLHelper.js');

export class Signup2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      email: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "username") console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  checkInput() {
    return (
      this.state.name.length &&
      this.state.username.length &&
      this.state.password.length &&
      this.state.email.length
    )
  }

  handleSubmit(event) {
    if (!this.checkInput()) return;
    let insertPart = "insert into customers(customerName, userName, password, email) ";
    let valuesPart = "values (";
    valuesPart += "'" + this.state.name + "',";
    valuesPart += "'" + this.state.username + "',";
    valuesPart += "'" + this.state.password + "',";
    valuesPart += "'" + this.state.email + "')";
    let queryString = insertPart + valuesPart;
    console.log(queryString);
    SQLHelper.query(queryString, (data) => {
      if (data.hasOwnProperty("error")) {
        window.alert("bruh")
      } else {
        window.location.href = "/";
      }
    });
    event.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <div className='center'>
          <a href='/'>
            <button className='closebtn'>✖</button>
          </a>
          <h1>Sign up</h1>
          <form>

            <div className='txt_field'>
              <input
                type='text'
                name='name'
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <label>Name</label>
            </div>

            <div className='txt_field'>
              <input
                type='text'
                name='username'
                value={this.state.username}
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

            <div className='txt_field'>
              <input
                type='text'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <label>Email</label>
            </div>

            <button type='submit' onClick={this.handleSubmit}>Sign Up</button>
            <div className='signup'>
              Already have an account?<a href="/login"> Login</a>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export function Signup() {
  const [value, setValue] = useState({
    username:"",
    password:"",
    email:""
  })

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    })
  };



  const handleSubmit = (event) => {
    event.preventDefault();
  };

    return (
        <React.Fragment>
            <div className='center'>
                <a href='/'>
                    <button className='closebtn'>✖</button>
                </a>
                <h1>Sign up</h1>
                <form className='signup'>

                <div className='txt_field'>
                  <input 
                    type='text' 
                    name='username'
                    value={value.username}
                    onChange={handleChange}
                    required/>
                  <label>Username</label>
                </div>

                <div className='txt_field'>
                  <input 
                    type='password'
                    name='password'
                    value={value.password}
                    onChange={handleChange}
                    required/>
                  <label>Password</label>
                </div>

                <div className='txt_field'>
                  <input type='password' required/>
                  <label>Retype password</label>
                </div>

                <div className='txt_field'>
                  <input 
                    type='text'
                    name='email'
                    value={value.email}
                    onChange={handleChange}
                    required/>
                  <label>Email</label>
                </div>

                <button className='regist' type='submit' onClick={handleSubmit}>Sign Up</button>
                <div className='signup'>
                  Already have an account?<a href="/login"> Login</a>
                </div>
              </form>
            </div>
        </React.Fragment>
    )
}
