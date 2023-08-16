import React, { useEffect, useState } from "react";
import { getEvents } from "../../managers/EventManager.js";

export const EventList = (props) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents().then(data => setEvents(data));
    }, []);

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.title}</div>
                        <div className="event__organizer">Organized by: {event.organizer.full_name}</div>
                        <div className="event__game">Game: {event.game.title}</div>
                        <div className="event__dateTime">Date & Time: {event.date_time}</div>
                        <div className="event__location">Location: {event.location}</div>
                    </section>
                })
            }
        </article>
    );
};
