import { useEffect, useState } from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import SearchBar from "../components/SearchBar/SearchBar";
import CreateBoardModal from "../components/CreateBoardModal/CreateBoardModal";

function HomePage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [boardTitle, setBoardTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const VITE_URL = import.meta.env.VITE_URL;

  useEffect(() => {
    axios
      .get(`${VITE_URL}/boards`)
      .then((res) => {
        setBoards(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    setBoards((prev) => prev.filter((board) => board.id !== id));
  };

  const handleOnChange = async (e) => {
    try {
      const title = e.target.value;
      setBoardTitle(title);

      if (title.trim()) {
        const response = await fetch(`${VITE_URL}/boards/title/${title}`);
        const data = await response.json();
        setBoards(data);
      } else {
        // If search is cleared, reload all boards
        const res = await fetch(`${VITE_URL}/boards`);
        const data = await res.json();
        setBoards(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClearSearch = async () => {
    setBoardTitle("");
    try {
      const res = await fetch(`${VITE_URL}/boards`);
      const data = await res.json();
      setBoards(data);
      console.log("cleared");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleOpenModal = async () => setIsModalOpen(true); // can maybe call this in the actual button clicks
  
  const handleCloseModal = async () => setIsModalOpen(false);

  const handleBoardCreate = (newBoard) => {
      setBoards((prev)=>[...prev, newBoard]);
      setIsModalOpen(false);
  }
  

  if (loading) return <div>Loading...</div>;

  return (
    <div>
        <h1>Home Page</h1>

      {/* FOR FUTURE REFERENCE!! Header, Banner, Search bar go here */}
      <SearchBar
        onChange={handleOnChange}
        value={boardTitle}
        handleClearSearch={handleClearSearch}
      />
      <div>
        <button onClick={handleOpenModal}>Add New Board</button>
      </div>
      {isModalOpen && (
        <CreateBoardModal 
        open={isModalOpen}
        onClose={handleCloseModal}
        onBoardCreated={handleBoardCreate}
      />
      )}
      
      <BoardGrid boards={boards} onDelete={handleDelete} />
      {/* Footer */}
    </div>
  );
}

export default HomePage;
