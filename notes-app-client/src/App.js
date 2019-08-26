import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from './Routes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userHasAuthenticated = auth => setIsAuthenticated(auth);
  const childProps = {
    isAuthenticated: isAuthenticated,
    userHasAuthenticated: userHasAuthenticated
  }

  const handleLogout = event => {
    userHasAuthenticated(false);
  }

  return (
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

export default App;
