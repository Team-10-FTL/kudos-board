import { useEffect, useState } from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import NavBar from "../components/Navbar/navbar";
function HomePage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

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



  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <header>
        <h1>Home Page</h1>

        <NavBar setBoards={setBoards}/>

      </header>

      {/* FOR FUTURE REFERENCE!! Header, Banner, Search bar go here */}
      
      <BoardGrid boards={boards} onDelete={handleDelete} />
      {/* Footer */}

      <footer>
        <p>&copy; 2025 Kudos Board. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
