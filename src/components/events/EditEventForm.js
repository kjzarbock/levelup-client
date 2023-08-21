import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent } from '../../managers/EventManager.js';
import { getGames } from "../../managers/GameManager.js";

export const EditEventForm = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    
    const [currentEvent, setCurrentEvent] = useState({
        title: "",
        date_time: "",
        game: 0,
        location: ""
    });

    useEffect(() => {
        // Fetch event data by ID
        getEventById(eventId)
            .then(eventData => {
                setCurrentEvent(eventData);
            })
            .catch(error => {
                console.error("Error fetching event:", error);
            });

        // Fetch games
        getGames().then(data => {
            setGames(data);
        });
    }, [eventId]);

    const changeEventState = (event) => {
        const { name, value } = event.target;
        setCurrentEvent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Event Title: </label>
                    <input
                        type="text"
                        name="title"
                        required
                        autoFocus
                        className="form-control"
                        value={currentEvent.title}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date_time">Event Date & Time: </label>
                    <input
                        type="text"
                        name="date_time"
                        required
                        autoFocus
                        className="form-control"
                        value={currentEvent.date_time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select
                        name="game"
                        required
                        autoFocus
                        className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}
                    >
                        <option value="">Select Game</option>
                        {games.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input
                        type="text"
                        name="location"
                        required
                        autoFocus
                        className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={(evt) => {
                    evt.preventDefault();

                    const updatedEvent = {
                        title: currentEvent.title,
                        date_time: currentEvent.date_time,
                        game: parseInt(currentEvent.game),
                        location: currentEvent.location
                    };

                    // Check if all required fields are filled
                    if (
                        updatedEvent.title === "" ||
                        updatedEvent.date_time === "" ||
                        isNaN(updatedEvent.game) ||
                        updatedEvent.location === ""
                    ) {
                        // Display window alert if any required fields are empty
                        alert("Please fill in all required fields before updating the event.");
                    } else {
                        // Send PUT request to update event
                        updateEvent(eventId, updatedEvent)
                            .then(() => navigate("/events"))
                            .catch(error => {
                                console.error("Error updating event:", error);
                            });
                    }
                }}
                className="btn btn-primary"
            >
                Update
            </button>
        </form>
    );
};
