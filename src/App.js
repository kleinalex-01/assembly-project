import { useState } from 'react';
import './App.css';
import Header from "./Components/Header";
import Main from "./Components/Main";

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const splitCurrentWord = currentWord.split("");
  const displayCurrentWord = splitCurrentWord.map((letter) => {
    return (
      <span key={letter} className='letter'>{letter}</span>
    )
  })
    return (
    <>
    <Header />
    <Main currentWord={displayCurrentWord}/>
    </>
  );
}

export default App;
