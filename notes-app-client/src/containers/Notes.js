import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";

export function Notes(props) {
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');
  const [attachmentURL, setAttachmentURL] = useState(null);
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

  return (<div className="Notes"></div>);
}