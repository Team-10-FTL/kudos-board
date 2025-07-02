import BoardCard from "../BoardCard/BoardCard";
import "./BoardGrid.css"

function BoardGrid({boards, onDelete}) {
    console.log("Boards: ",boards)
    console.log("type of boards"+ typeof(boards))
return (
    <div className="board-grid">
    {boards?.map((board) => (
        <BoardCard 
        key={board.id} 
        board={board}
        onDelete={onDelete} 
        />
    ))}
    </div>
);
}

export default BoardGrid;