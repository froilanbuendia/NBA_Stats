"use client";
import { NBA_SCORES_API } from "@/app/config/config";
import { useState, useEffect } from "react";
import ScoresCSS from "./scores.module.css";
import GameCard from "./GameScores";
interface Team {
  name: string;
  logo: string;
  score: number;
}

interface Game {
  id: string;
  shortName?: string; // Make shortName optional
  competition: {
    status: {
      type: { description: string };
      period?: number;
      displayClock?: string;
    };
    competitors: [
      {
        team: Team;
        homeAway: "home";
        score: number;
      },
      {
        team: Team;
        homeAway: "away";
        score: number;
      }
    ];
  };
}

const Scores = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      if (!NBA_SCORES_API) {
        console.error("NBA_SCORES_API is undefined");
        return; // Stop execution if the API URL is missing
      }

      try {
        const res = await fetch(NBA_SCORES_API);
        const data = await res.json();

        // Assuming 'events' contains the array of games
        if (data && data.events) {
          setGames(data.events); // Set the game data to the state
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching NBA scores:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className={ScoresCSS.scoresWrapper}>
      <h1 className={ScoresCSS.scoresHeader}>NBA Scores</h1>
      <div className={ScoresCSS.scoresGamesWrapper}>
        {games.length === 0 ? (
          <p>Loading scores...</p>
        ) : (
          games.map((game) => <GameCard key={game.id} game={game} />)
        )}
      </div>
    </div>
  );
};

export default Scores;
