import { Link } from "react-router-dom";
import "./BoardCard.css";

function BoardCard({ board }){
    const VITE_URL = import.meta.env.VITE_URL;

    const handleDelete = async() => {
        await axios.delete(`${VITE_URL}/boards/${board.id}`);
        onDelete(board.id);
    }

    return(
        <div className="BoardCard">
            <div className="media">
                <Link to={`/homepage/${board.id}`}>
                    {board.imageUrl ? <img src={board.imageUrl} alt="board cover"/> : <img src={"THISISADEFAULTROUTE"} alt="board cover" />}
                </Link>

            </div>
            <div className="board-Info">
            <p className="board-name">{board.title}</p>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default BoardCard;
