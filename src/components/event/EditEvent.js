import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { getGames } from "../game/GameManager.js"
import { getEventById } from "./EventManager.js"

export const EditEvent = () => {
    const {eventId} = useParams()
    const [games, setGames] = useState([])
    const history = useHistory()
    const [event, modifyEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0
    })

    useEffect(
        () => {
            getEventById(eventId)
            .then(
                (event) => {
                    modifyEvent({
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        gameId: event.game.id
                    })
                }
            )
        },
        [eventId]
    )

    useEffect(
        () => {
            getGames()
            .then(setGames)
        },
        []
    )

    const changeEventState = (domEvent) => {
        const copy = {...event}
        const key = domEvent.target.name
        const value = domEvent.target.value
        copy[key] = value
        modifyEvent(copy)
    }

    const UpdatedEvent = (evt) => {
        evt.preventDefault()
        const updatedEvent = {
            description: event.description,
            date: event.date,
            time: event.time,
            game: event.gameId
        }
        fetch(`http://localhost:8000/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(updatedEvent)
        })
        .then(
            () => {
                history.push(`/events`)
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
                    name="description"
                    value={event.description}
                    onChange={changeEventState}
                    />
                    <input
                    type="date"
                    required autoFocus 
                    name="date"
                    value={event.date}
                    onChange={changeEventState}
                    />
                    <input
                    type="time"
                    required autoFocus 
                    value={event.time}
                    name="time"
                    onChange={changeEventState}
                    />
                    <div>
                        <label>Game: </label>
                        <select
                        value={event.gameId}
                        name="gameId"
                        onChange={changeEventState}
                        >
                            <option value={0}>Choose an Option...</option>
                        {
                            games.map((game) => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })
                        }
                        </select>
                    </div>
                </div>
        <button
        onClick={
            (evt) => {
                UpdatedEvent(evt)
            }
        }
        >
            Save
        </button>
        </form>
        </>
    )
}