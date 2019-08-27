import React, { useState, useEffect } from 'react';
import { PageHeader, ListGroup } from "react-bootstrap";
import './Home.css';

function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const renderNotesList = notes => {
    return null;
  }

  const renderLander = () => {
    return (
      <div className='lander'>
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  const renderNotes = () => {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}

export default Home;