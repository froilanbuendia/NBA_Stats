"use client";
import ScoresCSS from "./scores.module.css";
import Link from "next/link";

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

const GameCard = ({ game }: { game: Game }) => {
  const { id, shortName, competitions } = game;
  const competition = competitions?.[0]; // Use optional chaining for safety

  // Handle case where competition or competitors is missing
  if (!competition || !competition.competitors) {
    return <div>Error: Missing competition data</div>;
  }

  const [homeTeam, awayTeam] = competition.competitors;

  const homeRecord = homeTeam?.record || "N/A"; // Add optional chaining for safety
  const awayRecord = awayTeam?.record || "N/A"; // Add optional chaining for safety

  return (
    <div>
      {competition.series.type == "playoff" ? (
        <Link
          key={id}
          className={ScoresCSS.scoreGamesContainer}
          href={`/games/${game.id}`}
        >
          <div className={ScoresCSS.teamScores}>
            <h3 className={ScoresCSS.shortName}>{shortName}</h3>
            <div className={ScoresCSS.teamScore}>
              {awayTeam && (
                <>
                  <img
                    src={awayTeam.team.logo} // Assuming awayTeam.team.logo contains the logo URL
                    alt={`${awayTeam.team.name} logo`}
                    className={ScoresCSS.teamLogo}
                  />
                  {awayTeam.team.name} [{awayRecord}]
                  <div className={ScoresCSS.score}>
                    {awayTeam.score || "N/A"}
                  </div>
                </>
              )}
            </div>
            <div className={ScoresCSS.teamScore}>
              {homeTeam && (
                <>
                  <img
                    src={homeTeam.team.logo} // Assuming homeTeam.team.logo contains the logo URL
                    alt={`${homeTeam.team.name} logo`}
                    className={ScoresCSS.teamLogo}
                  />
                  {homeTeam.team.name} [{homeRecord}]
                  <div className={ScoresCSS.score}>
                    {homeTeam.score || "N/A"}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={ScoresCSS.time}>
            {competition.status.type.description === "Final"
              ? competition.status.type.description
              : `Q${competition.status.period} ${competition.status.displayClock}`}
          </div>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GameCard;
