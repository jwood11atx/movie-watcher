import React from 'react';
import './signUp-style';
import { browserHistory } from 'react-router';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  }

  addNewUser() {
  const { name, email, password } = this.state
  fetch('/api/users/new', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify({ name, email, password })
  })
  .then(() =>
  fetch("/api/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password})
  })
  .then(res => res.json())
  .then(user => {
    this.props.signInClick(user.data);
    if(user) {browserHistory.push('/')}
  }))
  .catch(err => this.setState({ error: 'EXISTING_USER' }))
  }

  emailExistsError(err) {
    switch(err) {
      case 'EXISTING_USER':
        return(
          <p className='submit-error'>Email already exists, please try again with a different email address</p>
        );
      case 'BLANK_FIELD':
        return (
          <p className='submit-error'>Please enter a valid email address</p>
        )
    }
  }



  render(){
    const { name, email, password } = this.state
    return(
      <div>
        <form id='sign-up-form'>
          <input placeholder='Name'
                 value={name}
                 onChange={(e) => this.setState({ name: e.target.value })}
                 className='name-input'/>

          <input placeholder='Email'
                 value={email}
                 onChange={(e) => this.setState({ email: e.target.value })}
                 className='email input'/>

          {this.emailExistsError(this.state.error)}

          <input placeholder='Password'
                 value={password}
                 onChange={(e) => this.setState({ password: e.target.value })}
                 className='email input'/>

          <button className='btn' onClick={(e) => {
            e.preventDefault();
            if(!email) {
              this.setState({ error: 'BLANK_FIELD' })
              return
            }
            this.addNewUser();
            this.setState({ name: '', email: '', password: '' })
            }}>
            JOIN!
          </button>
        </form>
      </div>
    )
  }
}

export default SignUp;
