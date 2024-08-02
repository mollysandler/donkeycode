import React, { useState, useEffect } from 'react';
import './App.css';
import SubNavbar from './SubNavbar';
import { generate } from 'random-words';

function App() {
  const [word, setWord] = useState('');
  const [input, setInput] = useState('');
  const [correctChars, setCorrectChars] = useState([]);
  const [typingStarted, setTypingStarted] = useState(false);

  useEffect(() => {
    // Generate a string of 30 random words
    setWord(generate({ exactly: 30, join: ' ' }));

    // Add event listener for keypress
    const handleKeyPress = (e) => {
      if (typingStarted) {
        const char = e.key;
        if (char.length === 1) { // Only process single characters
          setInput(prevInput => {
            const newInput = prevInput + char;
            updateCorrectChars(newInput);
            return newInput;
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [typingStarted]);

  const updateCorrectChars = (value) => {
    const newCorrectChars = word.split('').map((char, index) => {
      if (index < value.length) {
        if (value[index] === char) {
          return 'correct';
        } else {
          return 'incorrect';
        }
      }
      return 'default';
    });

    setCorrectChars(newCorrectChars);
  };

  const handleStartTyping = () => {
    setTypingStarted(true);
  };

  return (
    <div className="App">
      <div className="header">
        <img src="./favicon.ico" alt="favicon" className="logo" />
        <h1 className="title">donkeytype</h1>
      </div>
      <div>
        <SubNavbar />
      </div>
      <button onClick={handleStartTyping} className="start-button">
        Start Typing
      </button>
      <div className="word-container">
        {word.split('').map((char, index) => (
          <span
            key={index}
            className={`letter ${correctChars[index]}`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
