"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams to get dynamic route params
import { NBA_BOX_SCORE } from "@/app/config/config";

const GameLog = () => {
  const { gameID } = useParams(); // Extract the dynamic route parameter (`id`) using `useParams`
  const [gameLog, setGameLog] = useState(null);
  console.log(gameID);

  useEffect(() => {
    if (!gameID) return; // Ensure the id is available before making the API request

    const fetchGameLog = async () => {
      try {
        const res = await fetch(`${NBA_BOX_SCORE}event=${gameID}`); // Use the ID to fetch data
        const data = await res.json();
        setGameLog(data); // Store the fetched data
      } catch (error) {
        console.error("Error fetching game log:", error);
      }
    };

    fetchGameLog();
  }, [gameID]); // Re-run the effect whenever the `id` changes

  return (
    <div>
      <h1>Game Log</h1>
      {gameLog ? (
        <pre>{JSON.stringify(gameLog, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GameLog;
