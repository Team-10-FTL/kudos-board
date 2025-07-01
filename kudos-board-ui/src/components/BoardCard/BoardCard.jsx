
import { Link } from "react-router-dom"
import "./BoardCard.css"

function BoardCard({ board }){

    return(

        <div className="BoardCard">
            <div className="media">
                <Link to={`/homepage/${board.id}`}>
                    {board.imageUrl ? <img src={board.imageUrl} alt="board cover"/> : <img src={"THISISADEFAULTROUTE"} alt="board cover" />}
                </Link>

            </div>
            <div className="board-Info">
            <p className="board-name">{board.title}</p>

            </div>

        </div>

    )

}

export default BoardCard;