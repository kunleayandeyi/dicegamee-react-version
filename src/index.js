import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Your styles from the original CSS file

// Importing dice images
import dice1 from './dice-images/dice-1.png';
import dice2 from './dice-images/dice-2.png';
import dice3 from './dice-images/dice-3.png';
import dice4 from './dice-images/dice-4.png';
import dice5 from './dice-images/dice-5.png';
import dice6 from './dice-images/dice-6.png';

// Map dice numbers to the respective image files
const diceImages = [null, dice1, dice2, dice3, dice4, dice5, dice6];

const DiceGame = () => {
  // State management for the game
  const [activePlayer, setActivePlayer] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScores, setTotalScores] = useState([0, 0]);
  const [dice, setDice] = useState(null);  // The dice will show numbers 1 to 6
  const [playing, setPlaying] = useState(true);

  // Roll the dice handler
  const rollDice = () => {
    if (playing) {
      const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
      setDice(randomDiceNumber);  // Set the dice state to the rolled number

      if (randomDiceNumber !== 1) {
        setCurrentScore(currentScore + randomDiceNumber);
      } else {
        // Switch player if dice shows 1
        setCurrentScore(0);
        setActivePlayer(activePlayer === 0 ? 1 : 0);
      }
    }
  };

  // Hold score handler
  const holdScore = () => {
    if (playing) {
      const newTotalScores = [...totalScores];
      newTotalScores[activePlayer] += currentScore;

      if (newTotalScores[activePlayer] >= 20) {
        setPlaying(false); // Player wins
      }

      setTotalScores(newTotalScores);
      setCurrentScore(0);
      setActivePlayer(activePlayer === 0 ? 1 : 0);
    }
  };

  // New game handler
  const newGame = () => {
    setPlaying(true);
    setTotalScores([0, 0]);
    setCurrentScore(0);
    setActivePlayer(0);
    setDice(null);  // Reset dice
  };

  return (
    <main>
      <section className={`player player--0 ${activePlayer === 0 ? 'player--active' : ''} ${!playing && totalScores[0] >= 20 ? 'player--winner' : ''}`}>
        <h2 className="name" id="name--0">Player 1</h2>
        <p className="score" id="score--0">{totalScores[0]}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--0">{activePlayer === 0 ? currentScore : 0}</p>
        </div>
      </section>
      
      <section className={`player player--1 ${activePlayer === 1 ? 'player--active' : ''} ${!playing && totalScores[1] >= 20 ? 'player--winner' : ''}`}>
        <h2 className="name" id="name--1">Player 2</h2>
        <p className="score" id="score--1">{totalScores[1]}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--1">{activePlayer === 1 ? currentScore : 0}</p>
        </div>
      </section>

      {/* Display dice image based on the current dice roll */}
      {dice && <img src={diceImages[dice]} alt={`Dice showing ${dice}`} className="dice" />}

      <button className="btn btn--new" onClick={newGame}>🔄 New game</button>
      <button className="btn btn--roll" onClick={rollDice} disabled={!playing}>🎲 Roll dice</button>
      <button className="btn btn--hold" onClick={holdScore} disabled={!playing}>📥 Hold</button>
    </main>
  );
};

// Rendering the DiceGame component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <DiceGame />
  </React.StrictMode>,
  document.getElementById('root')  // Ensure this ID matches your root div
);
