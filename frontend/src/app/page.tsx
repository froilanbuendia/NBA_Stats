"use client";
import { NBA_NEWS_API, NBA_TEAMS_API, NBA_TEAM_API } from "./config/config";
import { useEffect, useState } from "react";
import Scores from "./scores/Scores";

export default function Home() {
  const [news, setNews] = useState(null);
  const [teams, setTeams] = useState(null);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!NBA_NEWS_API) {
        console.error("NBA_NEWS_API is undefined");
        return; // Stop execution if the API URL is missing
      }

      try {
        const res = await fetch(NBA_NEWS_API);
        const result = await res.json();
        setNews(result);
        console.log("news:", news, result);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);
  useEffect(() => {
    const fetchTeams = async () => {
      if (!NBA_TEAMS_API) {
        console.error("NBA_TEAMS_API is undefined");
        return; // Stop execution if the API URL is missing
      }

      try {
        const res = await fetch(NBA_TEAMS_API);
        const result = await res.json();
        setTeams(result);
        console.log("teams:", teams, result);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(`${NBA_TEAM_API}1`);
      const result = await res.json();
      setTeam(result);
      console.log("team:", team, result);
    };

    fetchTeam();
  }, []); // Empty dependency array means it runs once after component mounts

  return (
    <div>
      <Scores />
    </div>
  );
}
