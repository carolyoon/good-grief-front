import React from 'react';

const Header = (props) => {
  return (
    <div>
      <header className="logo"></header>
      <button type="submit" value="Register">Register</button>
      <button type="submit" value="Login">Login</button>
      <button type="submit" value="Logout">Logout</button>
    </div>
  )
}

export default Header;