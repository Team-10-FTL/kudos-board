import Card from "../components/Card/Card.jsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const VITE_URL = import.meta.env.VITE_URL;

// insert card grid stuff here
function BoardPage() {
  const { id: boardId } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`${VITE_URL}/cards`);
        const allCards = res.data;

        const boardCards = allCards.filter((card) => card.boardId == boardId);
        setCards(boardCards);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [boardId]);

  if (loading) return <p>Loading cards...</p>;

  const addUpvote = async (card) => {
    try {
      const res = await axios.put(`${VITE_URL}/cards/${card.id}`);
      const updatedCard = res.data;

      setCards((prevCards) =>
        prevCards.map((c) => (c.id === updatedCard.id ? updatedCard : c))
      );
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  return (
    <>
      <div className="cardGrid">
        {!cards?.length ? (
          <div className="card">
            <p>No cards available in this board</p>
          </div>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              addUpvote={() => addUpvote(card)}
              onDelete={() => setCardToDelete(card.id)}
            />
          ))
        )}
      </div>
      {cardToDelete && (
        <Card
          cardId={cardToDelete}
          onDelete={(deletedId) => {
            setCards((prev) => prev.filter((card) => card.id !== deletedId));
            setCardToDelete(null);
          }}
          onCancel={() => setCardToDelete(null)}
        />
      )}
    </>
  );
}
export default BoardPage;
