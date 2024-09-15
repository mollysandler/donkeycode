import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text } from '@chakra-ui/react';

interface TypeInterfaceProps {
  text: string;
}

export const TypeInterface: React.FC<TypeInterfaceProps> = ({ text }) => {
  const [userInput, setUserInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = text.split(' ');

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      setUserInput(prev => prev.slice(0, -1));
    } else if (event.key === ' ') {
      if (userInput === words[currentWordIndex]) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
      }
    } else if (event.key.length === 1) {
      setUserInput(prev => prev + event.key);
    }
  }, [userInput, words, currentWordIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    setUserInput('');
    setCurrentWordIndex(0);
  }, [text]);

  return (
    <Box position="relative" width="100%" minHeight="100px" border="1px solid #ccc" borderRadius="md" p={4} fontSize="xl" fontFamily="monospace">
      <Box position="relative" whiteSpace="pre-wrap" wordBreak="break-word">
        {words.map((word, wordIndex) => (
          <Text as="span" key={wordIndex} mr={2}>
            {word.split('').map((char, charIndex) => {
              const isCurrentWord = wordIndex === currentWordIndex;
              const isTyped = isCurrentWord && charIndex < userInput.length;
              const isCorrect = isTyped && char === userInput[charIndex];
              
              return (
                <Text
                  as="span"
                  key={charIndex}
                  color={isTyped ? (isCorrect ? 'green' : 'red') : 'gray'}
                  textDecoration={isTyped && !isCorrect ? 'underline' : 'none'}
                >
                  {char}
                </Text>
              );
            })}
          </Text>
        ))}
      </Box>
      <Box position="absolute" top={0} left={0} opacity={0.5}>
        {userInput}
      </Box>
    </Box>
  );
};
