import React, { useEffect, useState } from "react";
import { getEvents } from "../../managers/EventManager.js";
import { useNavigate } from "react-router-dom";

export const EventList = (props) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getEvents().then(data => setEvents(data));
    }, []);

    return (
        <div>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate("/events/new"); // Correct usage of Navigate as a function
                }}
            >
                Register New Event
            </button>
            <article className="events">
                {
                    events.map(event => (
                        <section key={`event--${event.id}`} className="event">
                            <div className="event__title">{event.title}</div>
                            <div className="event__organizer">Organized by: {event.organizer.full_name}</div>
                            <div className="event__game">Game: {event.game.title}</div>
                            <div className="event__dateTime">Date & Time: {event.date_time}</div>
                            <div className="event__location">Location: {event.location}</div>
                        </section>
                    ))
                }
            </article>
        </div>
    );
};
