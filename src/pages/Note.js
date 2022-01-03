// import notes from "../assets/data";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Note(props) {
  const [note, setNote] = useState(null);
  const noteId = props.match.params.id;

  useEffect(() => {
    getNote();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId]);


  const getNote = async () => {
    const response = await fetch(`http://localhost:5000/notes/${noteId}`);
    const data = await response.json();
    setNote(data);
  };

  const CreateNote = async()=>{
    await fetch(`http://localhost:5000/notes/`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    })
  }

  const updatNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const deleteNote = async()=>{
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    props.history.push("/")
  }

  const submitNote = async () => {
    if(noteId !== 'new' && !note.body){
      deleteNote()
    }else if(noteId !== 'new'){
      updatNote()
    }else if(noteId === 'new' && note !== null) {
      CreateNote()
    }
    props.history.push("/")
  };

  // eslint-disable-next-line eqeqeq
  // const currentNote = notes.find((note) => note.id == noteId);
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to={`/`}>
            <ArrowLeft onClick={submitNote} />
          </Link>
        </h3>
        {noteId !== 'new' ? (

          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={submitNote}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
}
