import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { createGame, getGameTypes } from '../../managers/GameManager.js';

export const GameForm = () => {
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);

  const [currentGame, setCurrentGame] = useState({
    skillLevel: 0,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0
  });

  useEffect(() => {
    getGameTypes()
      .then(data => setGameTypes(data));
  }, []);

  const changeGameState = (event) => {
    const { name, value } = event.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
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
            required autoFocus
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
            required autoFocus
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
                        autoFocus
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

          const game = {
            title: currentGame.title,
            maker: currentGame.maker,
            number_of_players: parseInt(currentGame.numberOfPlayers),
            skill_level: currentGame.skillLevel,
            game_type: parseInt(currentGame.gameTypeId),
          };

          createGame(game)
            .then(() => navigate("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
