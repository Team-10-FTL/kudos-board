import { useEffect, useState } from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import CreateBoardModal from "../components/CreateBoardModal/CreateBoardModal";
import NavBar from "../components/NavBar/NavBar";
import kudos from "../assets/kudos.png";

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
    setBoards((prev) => [...prev, newBoard]);
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <header>
        <a href="/">
          <img src={kudos} className="logo"></img>
        </a>

        <NavBar setBoards={setBoards} />
      </header>
      <div>
        {/* FOR FUTURE REFERENCE!! Header, Banner, Search bar go here */}
        <div></div>
        {isModalOpen && (
          <CreateBoardModal
            open={isModalOpen}
            onClose={handleCloseModal}
            onBoardCreated={handleBoardCreate}
          />
        )}
        <BoardGrid boards={boards} onDelete={handleDelete} />
      </div>

      <button className="newBoardBtn" onClick={handleOpenModal}>
        add new board +
      </button>
      <footer>
        <p>&copy; 2025 Kudos Board. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
