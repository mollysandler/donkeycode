import React, { useState, useEffect, useCallback } from "react";
import { Box, Text } from "@chakra-ui/react";

interface TypeInterfaceProps {
  text: string;
}

export const TypeInterface: React.FC<TypeInterfaceProps> = ({ text }) => {
  const [characters, setCharacters] = useState(text.split("").map(char => ({ char, status: 'untyped' })));
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        if (currentCharIndex > 0) {
          setCharacters(prev => {
            const newChars = [...prev];
            newChars[currentCharIndex - 1].status = 'untyped';
            return newChars;
          });
          setCurrentCharIndex(prev => prev - 1);
        }
      } else if (event.key.length === 1 && currentCharIndex < characters.length) {
        setCharacters(prev => {
          const newChars = [...prev];
          newChars[currentCharIndex].status = event.key === characters[currentCharIndex].char ? 'correct' : 'incorrect';
          return newChars;
        });
        setCurrentCharIndex(prev => prev + 1);
      }
    },
    [characters, currentCharIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    setCharacters(text.split("").map(char => ({ char, status: 'untyped' })));
    setCurrentCharIndex(0);
  }, [text]);

  return (
    <Box
      position="relative"
      width="100%"
      minHeight="100px"
      border="1px solid #ccc"
      borderRadius="md"
      p={4}
      fontSize="xl"
      fontFamily="monospace"
    >
      <Box position="relative" whiteSpace="pre-wrap" wordBreak="break-word">
        {characters.map((charObj, index) => {
          const { char, status } = charObj;
          const isSpace = char === " ";

          return (
            <Text
              as="span"
              key={index}
              color={status === 'untyped' ? "gray" : (status === 'correct' ? "green" : "red")}
              textDecoration={status === 'incorrect' ? "underline" : "none"}
              backgroundColor={index === currentCharIndex ? "yellow" : "transparent"}
            >
              {isSpace ? "\u00A0" : char}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
};
