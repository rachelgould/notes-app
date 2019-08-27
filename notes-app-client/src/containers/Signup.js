import React, { useState } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";

function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newUser, setNewUser] = useState(null);

  const validateForm = () => {
    return email.length > 0 && password.length > 0 && password === confirmPassword;
  }

  const validateConfirmationForm = () => {
    return confirmationCode.length > 0;
  }

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;   
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      case 'confirmationCode':
        setConfirmationCode(event.target.value);
        break;   
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    setNewUser("test");
    setIsLoading(false);
  }

  const handleConfirmationSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
  }

  const renderConfirmationForm = () => {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId='confirmationCode' bsSize='large'>
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type='tel'
            value={confirmationCode}
            onChange={handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize='large'
          disabled={!validateConfirmationForm()}
          type='submit'
          isLoading={isLoading}
          text='Verify'
          loadingText='Verifying...'
        />
      </form>
    );
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={confirmPassword}
            onChange={handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!validateForm()}
          type="submit"
          isLoading={isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }
  
  return (
    <div className='Signup'>
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}

export default Signup;