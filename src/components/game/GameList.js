import React, { useEffect, useState } from "react";
import { getGames, deleteGame } from "../../managers/GameManager.js";
import { useNavigate, Link } from 'react-router-dom';

export const GameList = (props) => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate(); // Correctly using the useNavigate hook

    useEffect(() => {
        getGames().then(data => setGames(data));
    }, []);

    const handleDelete = (gameId) => {
        if (window.confirm("Are you sure you want to delete this game?")) {
            deleteGame(gameId)
                .then(() => {
                    // Refresh the games list after deletion
                    getGames().then(data => setGames(data));
                })
                .catch(error => {
                    console.error("Error deleting game:", error);
                });
        }
    };

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate("/games/new"); // Using navigate correctly
                }}>Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <Link to={`/games/${game.id}`} className="btn btn-primary">Edit</Link>
                        <button
                            onClick={() => handleDelete(game.id)}
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
