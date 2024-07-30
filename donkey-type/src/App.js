import React, { useState, useEffect } from 'react';
import './App.css';
import { generate } from 'random-words';

function App() {
  const [word, setWord] = useState('');
  const [input, setInput] = useState('');
  const [correctChars, setCorrectChars] = useState([]);

  useEffect(() => {
    // Generate a string of 5 random words
    setWord(generate({ exactly: 5, join: ' ' }));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const newCorrectChars = word.split('').map((char, index) => {
      if (index < value.length && value[index] === char) {
        return true;
      }
      return false;
    });

    setCorrectChars(newCorrectChars);
  };

  return (
    <div className="App">
      <h1>Typing Game</h1>
      <div className="word-container">
        {word.split('').map((char, index) => (
          <span
            key={index}
            className={`letter ${correctChars[index] ? 'correct' : 'incorrect'}`}
          >
            {char}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type the words here"
      />
    </div>
  );
}

export default App;
