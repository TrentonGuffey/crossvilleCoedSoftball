import { useEffect, useState } from "react"


export const GameSchedule = () => {
    const baseURL = `http://localhost:8088`
    const [games, setGames] = useState([])
    const [teams, setTeams] = useState([])

    useEffect(() => {
        fetch(`${baseURL}/games`)
            .then(res => res.json())
            .then((gamesArray) => {
                setGames(gamesArray)
            })
    }, [])

    useEffect(() => {
        fetch(`${baseURL}/teams`)
            .then(res => res.json())
            .then((teamsArray) => {
                setTeams(teamsArray)
            })
    }, [])

    const getTeamNameById = (teamId) => {
        const team = teams.find((team) => team.id === teamId)
        return team ? team.teamName : 'Unknown Team'
    }

    return (
        <>
            <h2>Fall 2023 Schedule</h2>
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
                        {games.map((game) => (
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
    )
}
