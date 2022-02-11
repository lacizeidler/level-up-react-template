import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getEvents, joinEvent, leaveEvent } from "./EventManager.js"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const deleteEvent = (id) => {
        fetch(`http://localhost:8000/events/${id}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(() => {
            getEvents().then(data => setEvents(data))
        })
    }

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            <article className="events">
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <div className="event__description">{event.description}</div>
                            <div className="event__date">{event.date}</div>
                            <div className="event__skillLevel">{event.time}</div>
                            <div className="event__game">{event.game.title}</div>
                            <button onClick={
                                () => {
                                    deleteEvent(parseInt(event.id))
                                }
                            }>Delete</button>
                            <button 
                            value={event.id}
                            key={`/events/edit/${event.id}`}
                            onClick={
                                () => {
                                    history.push(`/events/edit/${event.id}`)
                                }
                            }>Edit</button>
                            {
                                event.joined
                                ?
                                <button
                                onClick={() => {
                                    leaveEvent(event.id).then(getEvents)
                                }}
                                >
                                    Leave
                                </button>
                                :
                                <button
                                onClick={() => {
                                   joinEvent(event.id).then(getEvents)
                                }}
                                >
                                    Join
                                </button>
                            }
                        </section>
                    })
                }
            </article>
        </>
    )
}