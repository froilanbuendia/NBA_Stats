import ScoresCSS from "./scores.module.css";
import Link from "next/link";

interface Team {
  name: string;
  logo: string;
  score: number;
}

interface GameCardProps {
  game: {
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
  };
}

const GameCard = ({ game }: GameCardProps) => {
  const { id, shortName, competition } = game;
  const { competitors } = competition;

  const homeTeam = competitors.find((team) => team.homeAway === "home");
  const awayTeam = competitors.find((team) => team.homeAway === "away");

  if (!homeTeam || !awayTeam) return null; // Prevent errors if teams are undefined

  const homeRecord = homeTeam.team.score || "N/A";
  const awayRecord = awayTeam.team.score || "N/A";

  return (
    <Link href={`/games/${id}`} className={ScoresCSS.scoreGamesContainer}>
      <div className={ScoresCSS.teamScores}>
        <h3 className={ScoresCSS.shortName}>{shortName}</h3>
        <div className={ScoresCSS.teamScore}>
          <img
            src={awayTeam.team.logo} // Logo for away team
            alt={`${awayTeam.team.name} logo`}
            className={ScoresCSS.teamLogo}
          />
          {awayTeam.team.name}
          <div>[{awayRecord}]</div>
          <div className={ScoresCSS.score}>{awayTeam.team.score}</div>
        </div>
        <div className={ScoresCSS.teamScore}>
          <img
            src={homeTeam.team.logo} // Logo for home team
            alt={`${homeTeam.team.name} logo`}
            className={ScoresCSS.teamLogo}
          />
          {homeTeam.team.name}
          <div className={ScoresCSS.record}>[{homeRecord}]</div>
          <div className={ScoresCSS.score}>{homeTeam.team.score}</div>
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
