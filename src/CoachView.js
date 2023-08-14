import React, { useState } from "react";
import { TeamPlayers, AddPlayer, TeamSchedule2 } from "./Coach";
import { Link } from "react-router-dom";
import './Login.css';

export const CoachViews = () => {
    const [team, setTeam] = useState(null);

    const updateTeam = (newTeam) => {
        setTeam(newTeam);
    };

    return (
        <>
            <div className="teamPageContainer">
      <Link to="/">
        <button type="button">Log Out</button>
      </Link>
      <div className="contentContainer">
        <section className="playerList">
          <h2>Player List</h2>
          <TeamPlayers team={team} />
          <h2>Add New Player</h2>
          <AddPlayer team={team} updateTeam={updateTeam} />
        </section>
        <section className="teamSchedule">
          <h2>Schedule</h2>
          <TeamSchedule2 />
        </section>
      </div>
    </div>
        </>
    );
};
