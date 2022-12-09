import React from 'react'
import './design.css'

function NavigationBar() {
  let loginRender;
  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    loginRender = <>
      <li>Welcome, {loggedInUser}</li>
      <li onClick={() => {localStorage.clear()}}>
        <a href='/'>Logout</a>
      </li>
    </>
  } else {
    loginRender = <>
      <li><a href='/login'>Login</a></li>
      <li><a href='/signup'>Sign up</a></li>
      </>
  }

  return (
    <React.Fragment>
      <nav>
        <label className='logo'>Shop</label>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/cart'>Cart</a></li>
          {loginRender}
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default NavigationBar
