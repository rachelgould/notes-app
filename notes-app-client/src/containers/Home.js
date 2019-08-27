import React, { useState, useEffect } from 'react';
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './Home.css';
import { API } from 'aws-amplify';

function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!props.isAuthenticated) {
      return;
    }

    const fetchNotes = async () => {
      try {
        const notes = await API.get('notes', '/notes');
        setNotes(notes);
      } catch (e) {
        alert(e);
      }
    }

    fetchNotes();
    setIsLoading(false);
  }, []);

  const renderNotesList = notes => {
    return [{}].concat(notes).map((note, i) => {
      if (i !== 0) {
        return (
          <LinkContainer
            key={note.noteId}
            to={`/notes/${note.noteId}`}
          >
            <ListGroupItem header={note.content.trim().split('\n')[0]}>
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        );
      } else {
        return (
        <LinkContainer
            key="new"
            to="/notes/new"
          >
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroupItem>
          </LinkContainer>
        );
      }
    });
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