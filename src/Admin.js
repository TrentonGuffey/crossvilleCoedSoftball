import { useEffect, useState } from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';
import { Requests } from './Requests';
import { CompletedRequests } from './CompletedRequests';
import { RequestView } from './RequestView';

const baseURL = `http://localhost:8088`

export const AllPlayers = () => {
    const [players, setPlayers] = useState([])
    const [teams, setTeams ] = useState([])

    useEffect(() => {
        fetch(`${baseURL}/players`)
          .then((res) => res.json())
          .then((playerArray) => {
            setPlayers(playerArray)
          })
          .catch((error) => {
            console.error('Error fetching players:', error)
          });
    
        fetch(`${baseURL}/teams`)
          .then((res) => res.json())
          .then((teamArray) => {
            setTeams(teamArray)
          })
          .catch((error) => {
            console.error('Error fetching teams:', error)
          })
      }, [])

    
      const handleDelete = (id) => {
        fetch(`${baseURL}/players/${id}`, {
          method: 'DELETE',
        })
          .then((res) => {
            if (res.ok) {
              setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
            } else {
              console.error('Failed to delete player.')
            }
          })
          .catch((error) => {
            console.error('Error deleting player:', error)
          });
      };

      const handleTeamChange = (id, teamId) => {
        fetch(`${baseURL}/players/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ teamId }),
        })
          .then((res) => {
            if (res.ok) {
              setPlayers((prevPlayers) =>
                prevPlayers.map((player) => (player.id === id ? { ...player, teamId } : player))
              )
              window.alert('Player team updated successfully!')
            } else {
              console.error('Failed to update player team.')
            }
          })
          .catch((error) => {
            console.error('Error updating player team:', error)
          });
      };

      return (
        <>
          <article>
            <ul>
              {players.map((player) => (
                <section key={player.id} className="player">
                  <div>
                    {player.id}. {player.fullName}{' '}
                    <select
                      value={player.teamId}
                      onChange={(e) => handleTeamChange(player.id, parseInt(e.target.value))}
                      
                    >
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                        {team.id} - {team.teamName} {/* Show team ID and name in the dropdown */}
                      </option>
                      ))}
                    </select>
                    <button onClick={() => handleDelete(player.id)}>Delete</button>
                  </div>
                </section>
              ))}
            </ul>
          </article>
        </>
      );
    };

export const AdminView = () => {
    return (
        <>
            <Link to="/">
                <button type="Log out">Log Out</button>
                </Link>

            <h1>League Management</h1>
            <RequestView/>
            <h2>Player Lists</h2>
            <AllPlayers/>

        </>
    )
}



