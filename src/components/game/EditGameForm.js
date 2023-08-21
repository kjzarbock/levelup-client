import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getGameTypes, getGame, updateGame } from '../../managers/GameManager.js';

export const GameEditForm = () => {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [gameTypes, setGameTypes] = useState([]);
    const [currentGame, setCurrentGame] = useState({
        skillLevel: "",
        numberOfPlayers: "",
        title: "",
        maker: "",
        gameTypeId: "",
    });

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data));
        getGame(gameId).then(data => {
            setCurrentGame({
                skillLevel: data.skill_level,
                numberOfPlayers: data.number_of_players,
                title: data.title,
                maker: data.maker,
                gameTypeId: data.game_type,
            });
        });
    }, [gameId]);

    const changeGameState = (event) => {
        const { name, value } = event.target;
        setCurrentGame((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        required autoFocus
                        className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input
                        type="text"
                        name="maker"
                        required
                        className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input
                        type="number"
                        name="numberOfPlayers"
                        required
                        className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <select
                        name="skillLevel"
                        required
                        className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    >
                        <option value="">Select Skill Level</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select
                        name="gameTypeId"
                        required
                        className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}
                    >
                        <option value="">Select Game Type</option>
                        {gameTypes.map((gameType) => (
                            <option key={gameType.id} value={gameType.id}>
                                {gameType.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={(evt) => {
                    evt.preventDefault();

                    const updatedGame = {
                        id: gameId,
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: currentGame.skillLevel,
                        game_type: parseInt(currentGame.gameTypeId),
                    };

                    updateGame(updatedGame.id, updatedGame)
                        .then(() => navigate("/games"));
                }}
                className="btn btn-primary"
            >
                Save Changes
            </button>
        </form>
    );
};
