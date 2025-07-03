import { Link } from "react-router-dom";
import axios from "axios";
import "./BoardCard.css";

function BoardCard({ board, onDelete }) {
  const VITE_URL = import.meta.env.VITE_URL;

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
