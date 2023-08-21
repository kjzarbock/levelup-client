import React, { useEffect, useState } from "react";
import { getGames } from "../../managers/GameManager.js";
import { useNavigate, Link } from 'react-router-dom';

export const GameList = (props) => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate(); // Correctly using the useNavigate hook

    useEffect(() => {
        getGames().then(data => setGames(data));
    }, []);

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
                    </section>
                })
            }
        </article>
    );
};
