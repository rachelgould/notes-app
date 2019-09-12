import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

export function Notes(props) {
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');
  const [attachmentURL, setAttachmentURL] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  let file = null;

  useEffect(() => {
    let attachmentURL;

    const getNote = async () => {
      try {
        return await API.get('notes', `/notes/${props.match.params.id}`);
      } catch (e) {
        alert(e);
      }
    }

    const getAttachment = async (attachment) => {
      try {
        return await Storage.vault.get(attachment);
      } catch (e) {
        alert(e)
      }
    }

    const note = getNote();
    const { content, attachment } = note;

    if (attachment) {
      attachmentURL = getAttachment(attachment);
    }

    setNote(note);
    setContent(content);
    setAttachmentURL(attachmentURL);
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
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
        </form>}
    </div>
  );
}