import { Link } from "react-router-dom";
import axios from "axios";
import "./BoardCard.css";

function BoardCard({ board, onDelete }) {
  // Move this outside of the component
  const VITE_URL = import.meta.env.VITE_URL;

  // Error handling??
  const handleDelete = async () => {
    await axios.delete(`${VITE_URL}/boards/${board.id}`);
    onDelete(board.id);
  };

  return (
    <div className="BoardCard">
      <p className="board-name, boardInfo">{board.title}</p>
      <div className="media">
        <Link to={`/homepage/${board.id}`}>
          {board.imageUrl ? (
            <img src={board.imageUrl} alt="board cover" />
          ) : (
            // No back up image?
            <img src={"THISISADEFAULTROUTE"} alt="board cover" />
          )}
        </Link>
        <div className="board-Info">
          <a className="delete-btn" onClick={handleDelete}>
            delete-
          </a>
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
