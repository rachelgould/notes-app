import React, { useState } from "react";
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
            <LinkContainer to='/signup'>
              <NavItem>Signup</NavItem>
            </LinkContainer>
            <LinkContainer to='/login'>
              <NavItem>Login</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* As we navigate to different routes, the portion below the nav bar will change to whatever page is being requested. */}
      <Routes childProps={childProps}/> 
    </div>
  );
}

export default App;
