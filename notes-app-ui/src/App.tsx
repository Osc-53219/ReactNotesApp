import { useState } from "react";
import "./App.css"

type Note = {
  id: number;
  title: string;
  content: string;
}


const App = () => {
  const [notes, setNotes] = useState<
    Note[]
  >([
    {
      id: 1,
      title: "Notes Title 1",
      content: "Content 1"
    },
    {
      id: 2,
      title: "Notes Title 2",
      content: "Content 2"
    },
    {
      id: 3,
      title: "Notes Title 3",
      content: "Content 3"
    },
    {
      id: 4,
      title: "Notes Title 4",
      content: "Content 4"
    },
    {
      id: 5,
      title: "Notes Title 5",
      content: "Content 5"
    },
    {
      id: 6,
      title: "Notes Title 6",
      content: "Content 6"
    }
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = 
    useState<Note | null>(null);

  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = (
    Event: React.FormEvent
  ) => {
    Event.preventDefault();

    const newNote: Note = {
      id: notes.length +1,
      title: title,
      content: content
    }

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote =(
    Event: React.FormEvent
  ) => {
      Event.preventDefault();

      if(!selectedNote){
        return;
      }
    
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }

    const updatedNotesList = notes.map((note)=>
    note.id === selectedNote.id
      ? updatedNote
      : note
    )

    setNotes(updatedNotesList)
    setTitle("")
    setContent("")
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }

  return(
    <div className="app-container">
      <form 
        className="note-form"
        onSubmit={(Event) => 
          selectedNote
          ? handleUpdateNote(Event)
          : handleAddNote(Event)
        }
      >
        <input
          value={title}
          onChange={(Event) =>
            setTitle(Event.target.value)
          }
          placeholder="Title"
          required
        ></input>

        <textarea
        value={content}
        onChange={(Event) =>
          setContent(Event.target.value)
        }
          placeholder="Content"
          rows={10}
          required
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>
              Cancel
            </button>
          </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>

      <div className="notes-grid">
        {notes.map((note)=> (
          <div className="note-item"
          onClick={()=> handleNoteClick(note)}
          >
            <div className="notes-header">
              <button>x</button>
            </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default App;