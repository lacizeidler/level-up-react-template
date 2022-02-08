import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { getGameById, getGameTypes } from "./GameManager.js"

export const EditGame = () => {
    const {gameId} = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const history = useHistory()
    const [game, modifyGame] = useState({
        title: "",
        maker: "",
        numberOfPlayers: 0,
        skillLevel: 0,
        gameTypeId: 0
    })

    useEffect(
        () => {
            getGameById(gameId)
            .then(
                (game) => {
                    modifyGame({
                        title: game.title,
                        maker: game.maker,
                        numberOfPlayers: game.number_of_players,
                        skillLevel: game.skill_level,
                        gameTypeId: game.game_type.id
                    })
                }
            )
        },
        [gameId]
    )

    useEffect(
        () => {
            getGameTypes()
            .then(setGameTypes)
        },
        []
    )

    const changeGameState = (domEvent) => {
        const copy = {...game}
        const key = domEvent.target.name
        const value = domEvent.target.value
        copy[key] = value
        modifyGame(copy)
    }

    const UpdatedGame = (evt) => {
        evt.preventDefault()
        const updatedGame = {
            title: game.title,
            maker: game.maker,
            number_of_players: game.numberOfPlayers,
            skill_level: game.skillLevel,
            game_type: game.gameTypeId
        }
        fetch(`http://localhost:8000/games/${gameId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(updatedGame)
        })
        .then(
            () => {
                history.push(`/`)
            }
        )
    }

    return (
        <>
        <form>

                    <div>
                    <input
                    type="text"
                    required autoFocus 
                    name="title"
                    value={game.title}
                    onChange={changeGameState}
                    />
                    <input
                    type="text"
                    required autoFocus 
                    name="maker"
                    value={game.maker}
                    onChange={changeGameState}
                    />
                    <input
                    type="number"
                    required autoFocus 
                    value={game.numberOfPlayers}
                    name="numberOfPlayers"
                    onChange={changeGameState}
                    />
                    <input
                    type="number"
                    required autoFocus 
                    value={game.skillLevel}
                    name="skillLevel"
                    onChange={changeGameState}
                    />
                    <div>
                        <label>Game Type: </label>
                        <select
                        value={game.gameTypeId}
                        name="gameTypeId"
                        onChange={changeGameState}
                        >
                            <option value={0}>Choose an Option...</option>
                        {
                            gameTypes.map((gameType) => {
                                return <option key={gameType.id} value={gameType.id}>{gameType.label}</option>
                            })
                        }
                        </select>
                    </div>
                </div>
        <button
        onClick={
            (evt) => {
                UpdatedGame(evt)
            }
        }
        >
            Save
        </button>
        </form>
        </>
    )
}