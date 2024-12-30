import React from "react";
import { languages } from "./Languages";

export default function Main({currentWord}) {

    const getChips = languages.map((language) => {
        return (
            <div key={language.name} style={{backgroundColor: language.backgroundColor}} className="chip">
                <p>{language.name}</p>
            </div>
        )
    })
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const displayKeyboard = alphabet.split("").map((letter, index) => {
        return (
            <button key={index}>{letter.toUpperCase()}</button>
        )
    })
    
    return (
        <>
        <div className="display-win-lose">
            <div className="display-container">
                <p>Congratulations! You won</p>
            </div>
        </div>
        <div className="chips-container">
            {getChips}
        </div>
        <div className='word-display'>
        {currentWord}
        </div>
        <div className="keyboard">
            {displayKeyboard}
        </div>
        <div className="play-again-container">
            <button className="play-again">Play Again</button>
        </div>
        </>
    )
}