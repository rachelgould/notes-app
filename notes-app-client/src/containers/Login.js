import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;   
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
      props.history.push('/');
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId='email' bsSize='large'>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type='email'
            value={email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup controlId='password' bsSize='large'>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={handleChange}
            type='password'
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize='large'
          disabled={!validateForm()}
          type='submit'
          isLoading={isLoading}
          text='Login'
          loadingText='Logging in...'
        />
      </form>
    </div>
  );
}

export default Login;
