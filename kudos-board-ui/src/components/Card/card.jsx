import defaultImg from "../../assets/smiley.jpg";

import "./card.css";

function Card({ card, addUpvote, deleteCard }) {
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
            Upvote: {card.upvotes}
          </button>
          <button className="deleteBtn" onClick={deleteCard}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
