import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Flashcard() {
  const [newFlashcard, setFlashcard] = useState({});
  const [cards, setCards] = useState([]);
  const [text, setText] = useState("");
  const { flashcardId } = useParams();

  const createCard = async (flashcardId, text) => {
    const response = await fetch(
      `http://localhost:5000/flashcards/${flashcardId}/cards`,
      {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  };
  const getCard = async (flashcardId) => {
    const response = await fetch(
      `http://localhost:5000/flashcards/${flashcardId}`
    );
    return response.json();
  };

  // FETCH ON TOPIC CLICK
  useEffect(() => {
    async function fetchFlashcard() {
      if (!flashcardId) return;
      const newCard = await getCard(flashcardId);
      setFlashcard(newCard);
      setCards(newCard.cards);
      console.log(flashcardId);
    }
    fetchFlashcard();
  }, [flashcardId]);

  // POST CARDS TO API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { cards: serverCards } = await createCard(flashcardId, text);
    setCards(serverCards);
    setText("");
  };

  // DELETE CARDS
  // const handleDelete = async (flashcardId) => {
  //   await fetch(`http://localhost:5000/flashcards/${flashcardId}`, {
  //     method: "DELETE",
  //   });
  //   fetchFlashcards();
  // };

  // RECEIVE USER INPUT
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div className="flashcards">
        {cards.map((card) => (
          <li key={card}>
            {/* <button
              onClick={() => {
                handleDelete(flashcard._id);
              }}
            >
              X
            </button> */}
            {card}
          </li>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="card">Card title</label>
        <input
          value={text}
          onChange={handleChange}
          type="text"
          id="card"
        ></input>
        <button>Create Card</button>
      </form>
    </div>
  );
}

export default Flashcard;
