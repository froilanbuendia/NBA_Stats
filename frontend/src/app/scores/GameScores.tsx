import ScoresCSS from "./scores.module.css";
import Link from "next/link";

// Define the types for the `game` object
interface Team {
  name: string;
  logo: string;
}

interface Competitor {
  team: Team;
  homeAway: "home" | "away";
  score: number;
  records?: { type: string; summary: string }[];
}

interface Competition {
  status: {
    type: {
      description: string;
    };
    period?: number;
    displayClock?: string;
  };
  competitors?: [
    {
      team: Team;
      homeAway: "home";
    },
    {
      team: Team;
      homeAway: "away";
    }
  ];
}

interface Game {
  id: string;
  shortName?: string;
  competitions: Competition[];
}

interface GameCardProps {
  game: Game; // Use the Game type here
}

const GameCard = ({ game }: GameCardProps) => {
  const { id, shortName, competitions } = game;
  const competition = competitions[0];

  const homeTeam = competition.competitors.find(
    (team) => team.homeAway === "home"
  );
  const awayTeam = competition.competitors.find(
    (team) => team.homeAway === "away"
  );

  const homeRecord =
    homeTeam?.records?.find((rec) => rec.type === "total")?.summary || "N/A";
  const awayRecord =
    awayTeam?.records?.find((rec) => rec.type === "total")?.summary || "N/A";

  return (
    <Link
      key={id}
      className={ScoresCSS.scoreGamesContainer}
      href={`/games/${game.id}`}
    >
      <div className={ScoresCSS.teamScores}>
        <h3 className={ScoresCSS.shortName}>{shortName}</h3>
        <div className={ScoresCSS.teamScore}>
          <img
            src={awayTeam?.team.logo} // Assuming awayTeam.team.logo contains the logo URL
            alt={`${awayTeam?.team.name} logo`}
            className={ScoresCSS.teamLogo}
          />
          {awayTeam?.team.name} [{awayRecord}]
          <div className={ScoresCSS.score}>{awayTeam?.score}</div>
        </div>
        <div className={ScoresCSS.teamScore}>
          <img
            src={homeTeam?.team.logo} // Assuming homeTeam.team.logo contains the logo URL
            alt={`${homeTeam?.team.name} logo`}
            className={ScoresCSS.teamLogo}
          />
          {homeTeam?.team.name} [{homeRecord}]
          <div className={ScoresCSS.score}>{homeTeam?.score}</div>
        </div>
      </div>
      <div className={ScoresCSS.time}>
        {competition.status.type.description === "Final"
          ? competition.status.type.description
          : `Q${competition.status.period} ${competition.status.displayClock}`}
      </div>
    </Link>
  );
};

export default GameCard;
