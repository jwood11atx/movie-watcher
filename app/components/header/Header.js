import React, { Component } from 'react';
import SignIn from "../../containers/signInContainer/SignInContainer";
import { Link } from 'react-router'

const Header = (props) => {
  console.log(props);

  const signUp = () => {
    if(!props.user){
      return (
        <Link to='/join'>
        <button className='sign-up-out-btns btn'>
          Sign Up
        </button>
      </Link>
      )
    } else {
      return (
        <button className='sign-up-out-btns btn'>
          Sign Out
        </button>
      )
    }

  }

  return (
    <div className='header'>
    <Link to='/'>
    <span className='logo'>
       Ripe 
       <img
         className='logo-img'
         src='../assets/tomato.svg' />
       Tomatoes
    </span>
    </Link>
      <SignIn />
      <Link to='/favorites'>
        <button
          className='show-fav-btn btn'
          id='set-filter-btn'>
          Favorites
        </button>
      </Link>
      {signUp()}
    </div>
  )
}

export default Header;
