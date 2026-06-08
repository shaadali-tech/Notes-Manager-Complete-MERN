function Note({ note, deleteNote }) {
  return (
    <div className="task-card">
      <h2>{note.title}</h2>

      <p>{note.description}</p>

      <button onClick={() => deleteNote(note._id)}>Delete</button>
    </div>
  );
}

export default Note;
