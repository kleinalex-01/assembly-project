import { useState } from 'react';
import './App.css';
import Header from "./Components/Header";
import { languages } from "./Languages";
import clsx from "clsx";
import { words } from './words';
import Confetti from 'react-confetti';

function App() {
  const [currentWord, setCurrentWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuess, setWrongGuess] = useState(0);
  const splitCurrentWord = currentWord.split("");
  const wrongGuessCount = languages.filter((languages, index) => index < wrongGuess).length;
  const isGameWon = splitCurrentWord.every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount === languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const displayCurrentWord = splitCurrentWord.map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const missingLetter = !isGuessed && currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
      letter: true,
      missingLetter: missingLetter,
    });

    return (
      <span key={index} className={className}>
        {isGameLost ? letter.toUpperCase() : (isGuessed ? letter.toUpperCase() : "")}
      </span>
    );
  });

  function checkLetter(letter) {
    if (!currentWord.includes(letter)) {
      setWrongGuess(prev => prev + 1);
    }
    setGuessedLetters(
      guessedLetters.includes(letter) ? guessedLetters : [...guessedLetters, letter]
    );
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const displayKeyboard = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
      disabled: isGameOver,
    });


    return (
      <button
        key={letter}
        onClick={() => checkLetter(letter)}
        className={className}
        disabled={isWrong}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const getChips = languages.map((language, index) => {
    const isCrossedOut = wrongGuess > index;
    const className = clsx({
      chip: true,
      crossedOut: isCrossedOut,
    })
    return (
      <div key={language.name}
          style={{ backgroundColor: language.backgroundColor }}
          className={className}>
        <p>{language.name}</p>
      </div>
    );
  });

  function startNewGame() {
    setWrongGuess(0);
    setGuessedLetters([]);
    setCurrentWord(prev => words[Math.floor(Math.random() * words.length)]);
  }

  return (
    <>
      {isGameWon && <Confetti />}
      <Header />
      <div className="display-win-lose">
        <div className="display-container">
          {isGameWon &&<p className='win-background'>Congratulations! You won</p>}
          {isGameLost &&<p className='lose-background'>You lost</p>}
        </div>
      </div>
      <div className="chips-container">{getChips}</div>
      <div className="word-display">
        {displayCurrentWord}
      </div>
      <div className="keyboard">
        {displayKeyboard}
      </div>
      <div className="play-again-container">
        {isGameOver &&<button className="play-again" onClick={startNewGame}>Play Again</button>}
      </div>
    </>
  );
}

export default App;
