import Card from "../components/Card/Card.jsx";

// insert card grid stuff here

function BoardPage({ cards }) {
  // may need to add empty array?

  const removeCard = (board, card) => {
    // this isn't done yet!! update
    const newBoard = {
      ...board,
      [card.id]: board[card.id] - 1,
    };
    if (!newBoard[card.id]) {
      delete newBoard[card.id];
    }

    return newBoard;
  };

  return (
    <div className="cardGrid">
      {!cards?.length ? (
        <div className="card">
          <p>No cards available in this board</p>
        </div>
      ) : (
        cards.map((card) => (
          <Card
            key={card.id}
            boardId={card.boardId}
            message={card.message}
            upvotes={card.upvotes}
            gif={card.gif}
            removeCard={() => removeCard(card)}
          />
        ))
      )}
    </div>
  );
}
export default BoardPage;
