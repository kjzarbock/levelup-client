import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../../managers/EventManager.js";
import { useNavigate, Link } from 'react-router-dom';

export const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate(); // Correctly using the useNavigate hook

    useEffect(() => {
        getEvents().then(data => setEvents(data));
    }, []);

    const handleDelete = (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            deleteEvent(eventId)
                .then(() => {
                    // Refresh the events list after deletion
                    getEvents().then(data => setEvents(data));
                })
                .catch(error => {
                    console.error("Error deleting event:", error);
                });
        }
    };

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate("/events/new"); // Using navigate correctly
                }}>Create New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.title} on {event.date_time}</div>
                        <div className="event__game">Game: {event.game.title}</div>
                        <div className="event__location">Location: {event.location}</div>
                        <Link to={`/events/${event.id}`} className="btn btn-primary">Edit</Link>
                        <button
                            onClick={() => handleDelete(event.id)}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </section>
                })
            }
        </article>
    );
};
