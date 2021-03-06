import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";

function Notes(props) {
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');
  const [attachmentURL, setAttachmentURL] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  let file = null;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        let note = await API.get('notes', `/notes/${props.match.params.id}`);
        const {content, attachment } = note;
        setNote(note);
        setContent(content);
        if (attachment) {
          let attachmentURL = await getAttachment(attachment);
          setAttachmentURL(attachmentURL);
        }
      } catch (e) {
        alert(e);
      }
    }

    const getAttachment = async attachment => {
      try {
        let attachmentURL = await Storage.vault.get(attachment);
        return attachmentURL;
      } catch (e) {
        alert(e)
      }
    }
    fetchNote();
  }, []);

  const validateForm = () => {
    return content.length > 0;
  }

  const formatFilename = str => {
    return str.replace(/^\w+-/, "");
  }

  const handleChange = event => {
    switch (event.target.id) {
      case 'content':
        setContent(event.target.value);
        break;
    }
  }

  const handleFileChange = event => {
    file = event.target.files[0];
  }

  const handleSubmit = async event => {
    event.preventDefault();

    if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    setIsLoading(true);
  }

  const handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to delete this note?");

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
  }

  return (
    <div className="Notes">
      {note && 
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={handleChange}
              value={content}
              componentClass="textarea"
            />
          </FormGroup>
          {note.attachment &&
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>}
            <FormGroup controlId="file">
              {!note.attachment &&
                <ControlLabel>Attachment</ControlLabel>}
              <FormControl onChange={handleFileChange} type="file" />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!validateForm()}
              type="submit"
              isLoading={isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={isDeleting}
              onClick={handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
        </form>}
    </div>
  );
}

export default Notes