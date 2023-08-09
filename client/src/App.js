import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [title, setTitle] = useState("");

  // FETCH CARDS
  const fetchFlashcards = async () => {
    const response = await fetch("http://localhost:5000/flashcards");
    const newFlashcards = await response.json();
    setFlashcards(newFlashcards);
  };

  // POST CARDS TO API
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/flashcards", {
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
  // DELETE FLASHCARD
  const handleDeleteFlashcard = async (flashcardId) => {
    await fetch(`http://localhost:5000/flashcards/${flashcardId}`, {
      method: "DELETE",
    });
    fetchFlashcards();
  };

  // FETCH ON INITIAL PAGE LOAD
  useEffect(() => {
    fetchFlashcards();
  }, []);
  // RECEIVE USER INPUT
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <header>
        <Link className="home-link" to="/">
          StudyBuddy
        </Link>
      </header>
      <div className="flashcards">
        {flashcards.map((flashcard) => (
          <li key={flashcard._id}>
            <button
              onClick={() => {
                handleDeleteFlashcard(flashcard._id);
              }}
            >
              X
            </button>
            <Link className="link" to={`/flashcards/${flashcard._id}`}>
              {flashcard.title}
            </Link>
          </li>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="card">Topic</label>
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
