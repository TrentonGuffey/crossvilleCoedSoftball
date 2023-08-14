import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GameSchedule } from "./GameSchedule"
import WSLImage from './WSL_SLOWPITCH_Softball.webp'
import './Login.css';



export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0];

                    localStorage.setItem("coed_user", JSON.stringify({
                        id: user.id,
                        admin: user.isAdmin,
                        teamId: user.teamId
                    }))
                    if (user.isAdmin === true) {
                        navigate("/admin")
                    }
                    else {
                        navigate("/coach")
                    }
                }

                else {
                    window.alert("Invalid login")
                }
            })
    }
    return (
        <>
        <header className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
                      
        </header>
        <main>
            <h1>Crossville Adult Coed Softball</h1>
            <div className="link">Sanctioned with WSL <Link to="https://www.PlayWSL.com" target="_blank">PlayWSL.com</Link></div>
            <img className="wsl" src={WSLImage}/>

            <GameSchedule/>
        </main>
        </>
    )
}
