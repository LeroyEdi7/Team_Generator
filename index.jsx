import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [numTeams, setNumTeams] = useState(2);
  const [playersPerTeam, setPlayersPerTeam] = useState(3);
  const [playerNames, setPlayerNames] = useState("");
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCreateTeams = () => {
    // Process player names (split on line or comma)
    let names = playerNames
      .split(/[\n,]+/)
      .map((n) => n.trim())
      .filter(Boolean);

    // Validation
    if (names.length < numTeams * playersPerTeam) {
      setError(
        `You need at least ${numTeams * playersPerTeam} players for ${numTeams} teams of ${playersPerTeam}.`
      );
      setTeams([]);
      return;
    }
    setError("");

    // Shuffle names
    names = shuffleArray(names);

    // Create teams
    const newTeams = Array.from({ length: numTeams }, (_, i) => ({
      name: `Team ${i + 1}`,
      players: [],
    }));

    // Distribute players to teams
    for (let i = 0; i < numTeams * playersPerTeam; i++) {
      const teamIndex = i % numTeams;
      newTeams[teamIndex].players.push(names[i]);
    }

    setTeams(newTeams);
  };

  return (
    <>
      <Head>
        <title>Galactic Team Creator</title>
        <meta name="description" content="Create balanced teams with a galactic theme" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rubik:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="galactic-bg">
        <main className="container">
          <h1>
            <span role="img" aria-label="stars">
              ✨
            </span>{" "}
            Galactic Team Creator{" "}
            <span role="img" aria-label="rocket">
              🚀
            </span>
          </h1>
          
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateTeams();
            }}
          >
            <div className="input-row">
              <label>
                Number of teams:
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={numTeams}
                  onChange={(e) => setNumTeams(Number(e.target.value))}
                  required
                />
              </label>
              <label>
                Players per team:
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={playersPerTeam}
                  onChange={(e) => setPlayersPerTeam(Number(e.target.value))}
                  required
                />
              </label>
            </div>
            <label>
              Player Names (comma or newline separated):
              <textarea
                rows={5}
                placeholder="Alice, Bob, Charlie, Dave..."
                value={playerNames}
                onChange={(e) => setPlayerNames(e.target.value)}
                required
              />
            </label>
            <button type="submit">Create Teams</button>
          </form>

          {error && <div className="error">{error}</div>}

          <div className="teams">
            {teams.length > 0 && (
              <>
                <h2>
                  <span role="img" aria-label="trophy">
                    🏆
                  </span>{" "}
                  Teams
                </h2>
                <div className="team-cards">
                  {teams.map((team, idx) => (
                    <div className="team-card" key={idx}>
                      <div className="team-name">
                        <span role="img" aria-label="planet">
                          🪐
                        </span>{" "}
                        {team.name}
                      </div>
                      <ul>
                        {team.players.map((player, pIdx) => (
                          <li key={pIdx}>
                            <span role="img" aria-label="star">
                              ⭐️
                            </span>{" "}
                            {player}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}