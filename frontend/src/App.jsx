import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import LoadingSpinner from "./components/LoadingSpinner";
import Note from "./components/Note";
import api from "./services/api";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/notes", {
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
    } finally {
      setLoading(false);
    }
  };
  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");

      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);

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

      {loading ? (
        <LoadingSpinner />
      ) : (
        notes.map((note) => (
          <Note key={note._id} note={note} deleteNote={deleteNote} />
        ))
      )}
    </>
  );
}

export default App;
