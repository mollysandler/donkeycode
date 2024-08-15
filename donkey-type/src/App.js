import React, { useState, useEffect } from 'react';
import './App.css';
import { generate } from 'random-words';
import SubNavbar from "./SubNavbar";
import algs from './algs.json';  // Import the JSON file
import usages from './usages.json';  // Import the usages JSON file
import wordsData from './words.json';  // Import the words JSON file

function App() {
  const [word, setWord] = useState('');  // Ensure word is initialized as a string
  const [input, setInput] = useState('');
  const [correctChars, setCorrectChars] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [selectedUsage, setSelectedUsage] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [accuracy, setAccuracy] = useState(null); // State to store accuracy percentage
  const [typingEnabled, setTypingEnabled] = useState(true); // State to manage typing

  useEffect(() => {
    // Set the word based on the current selection
    if (selectedAlgorithm) {
      setWord(selectedAlgorithm.implementation);
    } else if (selectedUsage) {
      setWord(selectedUsage.implementation);
    } else if (selectedWords.length > 0) {
      setWord(selectedWords.join(' '));
    } else {
      setWord(generate({ exactly: 30, join: ' ' }));
    }

    const handleKeyPress = (e) => {
      const char = e.key;

      if (typingEnabled) {
        if (char.length === 1 && char !== 'Backspace') { // Only process single characters except backspace
          setInput(prevInput => {
            const newInput = prevInput + char;
            updateCorrectChars(newInput);
            return newInput;
          });
        } else if (char === 'Backspace') {
          setInput(prevInput => {
            const newInput = prevInput.slice(0, -1);  // Remove last character
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
  }, [selectedAlgorithm, selectedUsage, selectedWords, typingEnabled]);

  const updateCorrectChars = (value) => {
    const formattedWord = typeof word === 'string' ? word.replace(/\n/g, '⏎') : ''; // Ensure word is a string
    const newCorrectChars = formattedWord.split('').map((char, index) => {
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

    // Calculate accuracy if the input length matches the word length
    if (value.length === formattedWord.length) {
      calculateAccuracy(value);
      setTypingEnabled(false); // Disable typing
    }
  };

  const calculateAccuracy = (value) => {
    const formattedWord = typeof word === 'string' ? word.replace(/\n/g, '') : '';
    const correctCount = formattedWord.split('').reduce((count, char, index) => {
      return index < value.length && value[index] === char ? count + 1 : count;
    }, 0);
    const accuracyPercentage = Math.round((correctCount / formattedWord.length) * 100);
    setAccuracy(accuracyPercentage);
  };

  const handleNavSelect = (item) => {
    // Clear current input, correctChars, and accuracy
    setInput('');
    setCorrectChars([]);
    setAccuracy(null); // Reset accuracy when navigating
    setTypingEnabled(true); // Enable typing

    if (item === 'Algorithms') {
      // Randomly select one of the algorithms from algs.json
      const algorithmKeys = Object.keys(algs.algorithms);
      const randomAlgorithmKey = algorithmKeys[Math.floor(Math.random() * algorithmKeys.length)];
      setSelectedAlgorithm(algs.algorithms[randomAlgorithmKey]);
      setSelectedWords([]);  // Reset words when selecting algorithms
      setSelectedUsage(null);  // Reset usage when selecting algorithms
    } else if (item === 'Usages') {
      // Select a random usage example from usages.json
      const usageKeys = Object.keys(usages.usages);
      const randomUsageKey = usageKeys[Math.floor(Math.random() * usageKeys.length)];
      const randomUsage = usages.usages[randomUsageKey];
      setWord(randomUsage.implementation);
      setSelectedUsage({ name: randomUsageKey, implementation: randomUsage });
      setSelectedAlgorithm(null);  // Reset algorithm when selecting usages
      setSelectedWords([]);  // Reset words when selecting usages
    } else if (item === 'Words') {
      // Select 10 random words from words.json
      const shuffledWords = wordsData.words.sort(() => 0.5 - Math.random()).slice(0, 10);
      setSelectedWords(shuffledWords);
      setWord(shuffledWords.join(' '));
      setSelectedAlgorithm(null);  // Reset algorithm when selecting words
      setSelectedUsage(null);  // Reset usage when selecting words
    } else {
      setSelectedAlgorithm(null);  // Reset if another item is selected
      setSelectedWords([]);
      setSelectedUsage(null);  // Reset usage when selecting other items
      setWord(generate({ exactly: 30, join: ' ' }));
    }
  };

  const handleNewTest = () => {
    // Start a new test
    setInput('');
    setCorrectChars([]);
    setAccuracy(null);
    setTypingEnabled(true);
    handleNavSelect(''); // Reset to a default state if necessary
  };

  return (
    <div className="App">
      <div className="header">
        <img src="./favicon.ico" alt="favicon" className="logo" />
        <h1 className="title">donkeytype</h1>
      </div>
      <div>
        <SubNavbar onSelect={handleNavSelect} />
      </div>
      {selectedAlgorithm && (
        <div className="algorithm-info">
          <h2>{selectedAlgorithm.name}</h2>
          {/* <pre><code>{selectedAlgorithm.implementation}</code></pre> */}
        </div>
      )}
      {selectedUsage && (
        <div className="usage-info">
          <h2>{selectedUsage.name}</h2>
          {/* <pre><code>{selectedUsage.implementation}</code></pre> */}
        </div>
      )}
      <div className="word-container">
        <code>
          {typeof word === 'string' && word.split('').map((char, index) => (
            <span
              key={index}
              className={`letter ${correctChars[index]}`}
            >
              {char}
            </span>
          ))}
        </code>
      </div>
      {accuracy !== null && (
        <div className="accuracy-info">
          <h2>Accuracy: {accuracy}%</h2>
        </div>
      )}
      {!typingEnabled && (
        <button className="new-test-button" onClick={handleNewTest}>New Test</button>
      )}
    </div>
  );
}

export default App;
