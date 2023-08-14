import { useEffect, useState } from "react"
import "./Coach.css"
import { Link } from "react-router-dom"
const baseURL = `http://localhost:8088`


export const TeamPlayers = () => {
    const [team, setTeam] = useState()
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [requestDescription, setRequestDescription] = useState('')
    const localCoedUser = JSON.parse(localStorage.getItem("coed_user"))



    useEffect(() => {
        fetch(`${baseURL}/teams?_embed=players&userId=${localCoedUser.id}`)
            .then(res => res.json())
            .then((teamsArray) => {
                setTeam(teamsArray[0])
            })
    }, [])

    const postRequestToServer = (requestBody) => {
      return fetch(`${baseURL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    };
    
    const handleRequestClick = (player) => {
      setSelectedPlayer(player);
    };
    
    const handleCloseClick = () => {
      setSelectedPlayer(null);
      setRequestDescription('');
    };

    const handleDescriptionChange = (event) => {
      setRequestDescription(event.target.value);
    };
  
    const handleRequestSubmit = () => {
      if (!selectedPlayer || requestDescription.trim() === '') {
        alert('Please select a player and enter a description.');
        return;
      }
      
      const requestBody = {
        playerId: selectedPlayer.id,
        description: requestDescription,
      };
      postRequestToServer(requestBody)
        .then((response) => {
          // Handle the success response if needed
          console.log('Request submitted successfully.');
        })
        .catch((error) => {
          // Handle the error if needed
          console.error('Error submitting the request:', error);
        })
        .finally(() => {
          // Close the dialog box and reset the state
          setSelectedPlayer(null);
          setRequestDescription('');
        });
    };
    return (
      <>
      {team?.players.map((player) => (
        <p className="teamPlayers" key={player.id}>
          {player.fullName}{' '}
          <button onClick={() => handleRequestClick(player)}>Request</button>
        </p>
      ))}
      {selectedPlayer && (
         <div style={{ border: '1px solid black', padding: '10px', position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              cursor: 'pointer',
              fontSize: '1.5em',
            }}
            onClick={handleCloseClick}
          >
            X
          </span>
          <h3>Requesting: {selectedPlayer.fullName}</h3>
          <textarea
            value={requestDescription}
            onChange={handleDescriptionChange}
            placeholder="Enter your request description..."
            rows={4}
            cols={50}
          />
          <button onClick={handleRequestSubmit}>Submit Request</button>
        </div>
      )}
    </>
  );
};

export const TeamSchedule2 = () => {
    const [games, setGames] = useState([]);
    const [team, setTeam] = useState()
    const [teams, setTeams] = useState([])
    const localCoedUser = JSON.parse(localStorage.getItem("coed_user"))

    useEffect(() => {
        fetch(`${baseURL}/games`)
            .then(res => res.json())
            .then(gamesArray => setGames(gamesArray));
    }, [])

    useEffect(() => {
        if (localCoedUser.id) {
            fetch(`${baseURL}/teams/${localCoedUser.id}`)
                .then(res => res.json())
                .then((teamData) => {
                    setTeam(teamData)
                })
        }
    }, [localCoedUser.id])

    useEffect(() => {
        fetch(`${baseURL}/teams`)
            .then(res => res.json())
            .then((teamsArray) => {
                setTeams(teamsArray)
            })
    }, [])


    const getTeamNameById = teamId => {
        const coachTeam = teams.find(team => team.id === teamId);
        return coachTeam ? coachTeam.teamName : "Unknown Team"
    }

    const filteredGames = localCoedUser.teamId
        ? games.filter(game => game.awayTeamId === localCoedUser.teamId || game.homeTeamId === localCoedUser.teamId)
        : games;

    return (
        <>
            <article className="games">
            <table className="gamesTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Field</th>
                            <th>Time</th>
                            <th>Away Team</th>
                            <th>Home Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGames.map((game) => (
                            <tr key={game.id}>
                                <td>{game.date}</td>
                                <td>{game.fieldId}</td>
                                <td>{game.time}</td>
                                <td>{getTeamNameById(game.awayTeamId)}</td>
                                <td>{getTeamNameById(game.homeTeamId)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </article>
        </>
    );

}

export const AddPlayer = ({team, updateTeam}) => {
    const localCoedUser = JSON.parse(localStorage.getItem("coed_user"))

    const [playerData, setPlayerData] = useState({
      id: '',
      fullName: '',
      teamId: localCoedUser.teamId
      
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setPlayerData((prevState) => ({ ...prevState, [name]: value }))
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
    
      fetch(`${baseURL}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('New player added:', data)
          setPlayerData({
            id: '',
            fullName: '',
            teamId: localCoedUser.teamId
          
          })

          fetch(`${baseURL}/teams?_embed=players&userId=${localCoedUser.id}`)
          .then((res) => res.json())
          .then((teamsArray) => {
            updateTeam(teamsArray[0])
            window.location.reload()
          });
        })
        .catch((error) => {
          console.error('Error adding player:', error)
        })
    }

  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={playerData.fullName}
            onChange={handleChange}
          />
        </label>
       <button type="submit">Add Player</button>
      </form>
    )
  }
  