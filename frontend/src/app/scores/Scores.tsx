"use client";
import { NBA_SCORES_API } from "@/app/config/config";
import { useState, useEffect } from "react";
import ScoresCSS from "./scores.module.css";
import GameCard from "./GameScores";

interface Team {
  name: string;
  logo: string;
}

interface Competition {
  status: {
    type: {
      description: string;
    };
    period?: number;
    displayClock?: string;
  };
  series: {
    type: string;
  };
  competitors?: Array<{
    team: Team;
    homeAway: "home" | "away";
    score: string;
    record: string;
  }>;
}

interface Game {
  id: string;
  shortName?: string;
  competitions: Competition[];
}

const Scores = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      if (!NBA_SCORES_API) {
        console.error("NBA_SCORES_API is undefined");
        setError("API URL is missing.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(NBA_SCORES_API);
        const data = await res.json();

        // Early return if data is invalid
        if (!data || !data.events) {
          setError("Invalid data format");
          setLoading(false);
          return;
        }

        setGames(data.events);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching NBA scores:", error);
        setError("Error fetching scores.");
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) return <p>Loading scores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={ScoresCSS.scoresWrapper}>
      <h1 className={ScoresCSS.scoresHeader}>NBA Scores</h1>
      <div className={ScoresCSS.scoresGamesWrapper}>
        {games.length === 0 ? (
          <p>No games available</p>
        ) : (
          games.map((game) => <GameCard key={game.id} game={game} />)
        )}
      </div>
    </div>
  );
};

export default Scores;
