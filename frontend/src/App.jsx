import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/notes", {
        title,
        description,
      });

      console.log(response.data);

      alert("Note Added Successfully");
      await fetchNotes();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes");

      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Notes Manager</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="Titleid">Title</label>
        <input
          id="Titleid"
          type="text"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <label htmlFor="descid">Description</label>
        <input
          id="descid"
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h2>All Notes</h2>

      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </>
  );
}

export default App;
