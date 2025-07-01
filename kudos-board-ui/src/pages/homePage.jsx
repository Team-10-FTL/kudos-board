import { useEffect, useState } from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import SearchBar from "../components/SearchBar/SearchBar";

function HomePage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [boardTitle, setBoardTitle] = useState("");

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* FOR FUTURE REFERENCE!! Header, Banner, Search bar go here */}
      <SearchBar
        onChange={handleOnChange}
        value={boardTitle}
        handleClearSearch={handleClearSearch}
      />
      <BoardGrid boards={boards} onDelete={handleDelete} />
      {/* Footer */}
      <h1>Home Page</h1>
    </div>
  );
}

export default HomePage;
