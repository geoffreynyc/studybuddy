import { useState, useEffect } from "react";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [title, setTitle] = useState("");

  const fetchFlashcards = async () => {
    const response = await fetch("http://localhost:5000/flashcard");
    const newFlashcards = await response.json();
    setFlashcards(newFlashcards);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/flashcard", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
    fetchFlashcards();
  };

  const handleDelete = async (flashcardId) => {
    await fetch(`http://localhost:5000/flashcard/${flashcardId}`, {
      method: "DELETE",
    });
    fetchFlashcards();
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <header>
        <h1>StudyBuddy</h1>
      </header>
      <div className="flashcards">
        {flashcards.map((flashcard) => (
          <li key={flashcard._id}>
            <button
              onClick={() => {
                handleDelete(flashcard._id);
              }}
            >
              X
            </button>
            {flashcard.title}
          </li>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="card">Card title</label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          id="card"
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
}

export default App;
