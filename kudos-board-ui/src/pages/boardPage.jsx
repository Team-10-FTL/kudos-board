import Card from "../components/Card/card.jsx";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import kudos from "../assets/kudos.png";
import UISwitch from "../components/UISwitch/UISwitch.jsx";

const VITE_URL = import.meta.env.VITE_URL;

// insert card grid stuff here
function BoardPage() {
  // add
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);
  const [message, setMessage] = useState("");

  const { id: boardId } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // search gifs
  const [searchInput, setSearchInput] = useState("");
  const [options, setOptions] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);

  // fetch all cards wtih boardId
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`${VITE_URL}/cards`);
        const allCards = res.data;

        const boardCards = allCards.filter((card) => card.boardId == boardId);

        setCards(boardCards);

        if (dialogRef.current) {
          if (isDialogOpen) {
            dialogRef.current.showModal();
          } else {
            dialogRef.current.close();
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [boardId, isDialogOpen]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setMessage("");
    setSearchInput("");
    setOptions([]);
    setSelectedGif(null);
  };

  // loading state
  if (loading) return <p>Loading cards...</p>;

  // GIPHY API search results
  const fetchGifs = async (query) => {
    try {
      console.log("testing fetching gifs");
      const { data } = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: `${import.meta.env.VITE_API_KEY}`,
          q: query,
          limit: 5,
        },
      });
      setOptions(data.data);
    } catch (error) {
      console.log("Error fetching GIF from API", error);
    }
  };

  // API request sent
  const handleSearchInput = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.trim()) {
      await fetchGifs(value);
    } else {
      setOptions([]); // clear if input is empty
    }
  };

  //add functionality
  const confirmAdd = async () => {
    try {
      const res = await axios.post(`${VITE_URL}/cards`, {
        boardId,
        message: message,
        gif: selectedGif.images.fixed_height.url,
        upvotes: 0,
      });

      const newCard = res.data;
      setCards((prev) => [...prev, newCard]); // add new card to bottom of list

      setIsDialogOpen(false);
      setMessage("");
      setSearchInput("");
      setOptions([]);
      setSelectedGif(null);
    } catch (e) {
      console.log("Failed to add card: ", e);
    } finally {
      setIsDialogOpen(false);
    }
  };

  // upvote functionality
  const addUpvote = async (card) => {
    try {
      const res = await axios.put(`${VITE_URL}/cards/${card.id}`);
      const updatedCard = res.data;

      setCards((prevCards) =>
        prevCards.map((c) => (c.id === updatedCard.id ? updatedCard : c))
      );
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  return (
    <>
      <header>
        <a href="/">
          <img src={kudos} className="logo"></img>
        </a>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
            gap: "20px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <UISwitch />
          </div>
          <button className="createCard" onClick={openDialog}>
            Create Card
          </button>
        </div>
      </header>
      <div className="cardGrid">
        {!cards?.length ? (
          <div className="card">
            <p>No cards available in this board</p>
          </div>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              addUpvote={() => addUpvote(card)}
              onDelete={(deletedId) =>
                setCards((prev) => prev.filter((card) => card.id !== deletedId))
              }
            />
          ))
        )}
      </div>
      <dialog ref={dialogRef} onCancel={closeDialog}>
        Message:{" "}
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        ></input>
        Search for GIF:{" "}
        <input
          onClick={fetchGifs}
          type="text"
          value={searchInput}
          onChange={handleSearchInput}
        ></input>
        <div className="gif-options">
          {options?.length > 0 && (
            <div className="gif-list">
              {options.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.images.fixed_height_small.url}
                  alt="GIF"
                  onClick={() => setSelectedGif(gif)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedGif?.id === gif.id ? "2px solid blue" : "none",
                    margin: "4px",
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <button onClick={confirmAdd}>Add Card</button>
        <button onClick={closeDialog}>Cancel</button>
      </dialog>
      <footer>
        <p>&copy; 2025 Kudos Board. All rights reserved.</p>
      </footer>
    </>
  );
}
export default BoardPage;
