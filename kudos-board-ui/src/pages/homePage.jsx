import { useEffect, useState } from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import CreateBoardModal from "../components/CreateBoardModal/CreateBoardModal";
import NavBar from "../components/Navbar/NavBar";


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



  const handleOpenModal = async () => setIsModalOpen(true);
  const handleCloseModal = async () => setIsModalOpen(false);

  const handleBoardCreate = (newBoard) => {
      setBoards((prev)=>[...prev, newBoard]);
      setIsModalOpen(false);
  }
  

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <header>
        <h1>Home Page</h1>

        <NavBar setBoards={setBoards}/>

      </header>

      {/* FOR FUTURE REFERENCE!! Header, Banner, Search bar go here */}
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

      <footer>
        <p>&copy; 2025 Kudos Board. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
