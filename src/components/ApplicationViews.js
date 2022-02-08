import React from "react"
import { Route } from "react-router-dom"
import { EditEvent } from "./event/EditEvent"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { EditGame } from "./game/EditGame"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path = "/games/edit/:gameId(\d+)">
                <EditGame />
            </Route >
            <Route exact path = "/events/edit/:eventId(\d+)">
                <EditEvent />
            </Route >
        </main>
    </>
}
