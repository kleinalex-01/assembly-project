import { useState } from 'react';
import './App.css';
import Header from "./Components/Header";
import { languages } from "./Languages";
import clsx from "clsx";

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const splitCurrentWord = currentWord.split("");

  const displayCurrentWord = splitCurrentWord.map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
      letter: true,
    });

    return (
      <span key={index} className={className}>
        {isGuessed ? letter : "_"}
      </span>
    );
  });

  function checkLetter(letter) {
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
    });

    return (
      <button
        key={letter}
        onClick={() => checkLetter(letter)}
        className={className}
        disabled={isGuessed}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const getChips = languages.map((language) => {
    return (
      <div key={language.name} style={{ backgroundColor: language.backgroundColor }} className="chip">
        <p>{language.name}</p>
      </div>
    );
  });

  return (
    <>
      <Header />
      <div className="display-win-lose">
        <div className="display-container">
          <p>Congratulations! You won</p>
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
        <button className="play-again">Play Again</button>
      </div>
    </>
  );
}

export default App;
