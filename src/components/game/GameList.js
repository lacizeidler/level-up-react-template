import React, { useEffect, useState } from "react"
import { getGames } from "./GameManager.js"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const deleteGame = (id) => {
        fetch(`http://localhost:8000/games/${id}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(() => {
            getGames().then(data => setGames(data))
        })
    }

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} by {game.maker}</div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                            <button onClick={
                                () => {
                                    deleteGame(parseInt(game.id))
                                }
                            }>Delete</button>
                            <button 
                            value={game.id}
                            key={`/games/edit/${game.id}`}
                            onClick={
                                () => {
                                    history.push(`/games/edit/${game.id}`)
                                }
                            }>Edit</button>
                        </section>
                    })
                }
            </article>
        </>
    )
}