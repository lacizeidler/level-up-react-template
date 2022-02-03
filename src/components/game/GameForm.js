import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes()
        .then(setGameTypes)
    }, [])

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.title = evt.target.value
                                setCurrentGame(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={
                            (evt) => {
                            const copy = {...currentGame}
                            copy.maker = evt.target.value
                            setCurrentGame(copy)
                        }
                    }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={
                            (evt) => {
                            const copy = {...currentGame}
                            copy.numberOfPlayers = evt.target.value
                            setCurrentGame(copy)
                        }
                    }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={
                            (evt) => {
                            const copy = {...currentGame}
                            copy.skillLevel = evt.target.value
                            setCurrentGame(copy)
                        }
                    }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select>
                        <option value={0}>Select a Game Type</option>
                        {
                            gameTypes.map((gameType) => {
                                return <option key={gameType.id} value={currentGame.gameTypeId} onChange={
                                    (evt) => {
                                        const copy = {...currentGame}
                                        copy.gameTypeId = evt.target.value
                                        setCurrentGame(copy)
                                    }
                                }>{gameType.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}