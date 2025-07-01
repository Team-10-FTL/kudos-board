import BoardCard from "../BoardCard/BoardCard";

function BoardGrid({ boards }) {
return (
    <div className="board-grid">
    {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
    ))}
    </div>
);
}

export default BoardGrid;