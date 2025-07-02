import defaultImg from "../../assets/smiley.jpg";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./card.css";

// NOTE: error check delete logic once more cards are added
const VITE_URL = import.meta.env.VITE_URL;

function Card({ card, addUpvote, onDelete }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isDialogOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isDialogOpen]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const confirmDelete = async () => {
    try {
      await axios.delete(`${VITE_URL}/cards/${card.id}`);
      onDelete(card.id);
    } catch (e) {
      console.log("Failed to delete card: ", e);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="card">
      <div className="card-info">
        <div className="info">
          <span className="message">{card.message}</span>
        </div>
        <div className="gif">
          <Link to={`/${card.id}`}>
            {card.gif ? (
              <img src={card.gif} alt="GIF cover" />
            ) : (
              <img src={defaultImg} alt="Default GIF cover" />
            )}
          </Link>
        </div>
        <div className="buttons">
          <button className="upvoteBtn" onClick={addUpvote}>
            Upvotes: {card.upvotes}
          </button>
          <button className="deleteBtn" onClick={openDialog}>
            Delete
          </button>
          <dialog ref={dialogRef} onCancel={closeDialog}>
            <p>Are you sure you want to delete this card?</p>
            <button onClick={confirmDelete}>Yes, delete it!</button>
            <button onClick={closeDialog}>Cancel</button>
          </dialog>
        </div>
      </div>
    </div>
  );
}

export default Card;
