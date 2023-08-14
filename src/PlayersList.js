import { useEffect, useState } from "react"
const baseURL = `http://localhost:8088`



export const AllPlayers = () => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        fetch(`${baseURL}/players`)
            .then(res => res.json())
            .then((playerArray) => {
                setPlayers(playerArray)
            })
    }, [players])


    const handleDelete = (id) => {
        fetch(`${baseURL}/players/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res) {
                    setPlayers(players)
                } else {
                    console.error('Failed to delete player.');
                }
            })
            .catch(error => {
                console.error('Error deleting player:', error);
            });
    };

    return (
        <>
            <article>
                <ul>
                    {players.map((player) => {
                        return (
                            <section key={player.id} className="player">
                                <div>
                                    {player.id}. {player.fullName} {' '}
                                    <button onClick={() => handleDelete(player.id)}>Delete</button>
                                </div>
                            </section>
                        )
                    })}
                </ul>
            </article>
        </>
    )
}