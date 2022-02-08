import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "../game/GameManager"
import { createEvent } from "./EventManager"

export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState(
        {
            description: "",
            date: "",
            time: "",
            gameId: 0
        }
    )

    useEffect(
        () => {
            getGames()
            .then(setGames)
        },
        []
    )

    const changeEventState = (domEvent) => {
        const copy = {...currentEvent}
        const key = domEvent.target.name
        const value = domEvent.target.value
        copy[key] = value
        setCurrentEvent(copy)
    }

    return (
        <form>
            <h2>
                Register New Event
            </h2>
            <fieldset>
                <div>
                    <label>
                        Description:
                    </label>
                    <input
                    type="text" 
                    name="description" 
                    required autoFocus 
                    className="form-control"
                    value={currentEvent.description}
                    onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="gameId" value={currentEvent.gameId} onChange={changeEventState}>
                        <option value={0}>Select a Game:</option>
                        {
                           games.map((game) => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        gameId: parseInt(currentEvent.gameId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}