import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from 'aws-amplify';
import "./App.css";
import Routes from './Routes';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const userHasAuthenticated = auth => setIsAuthenticated(auth);
  const childProps = {
    isAuthenticated: isAuthenticated,
    userHasAuthenticated: userHasAuthenticated
  };

  useEffect(async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }, []);

  const handleLogout = async event => {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push('/login');
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated
              ? <NavItem onClick={handleLogout}>Logout</NavItem>
              : <Fragment>
                  <LinkContainer to='/signup'>
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <NavItem>Login</NavItem>
                  </LinkContainer>
              </Fragment>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* As we navigate to different routes, the portion below the nav bar will change to whatever page is being requested. */}
      <Routes childProps={childProps}/> 
    </div>
  );
}

export default withRouter(App);
