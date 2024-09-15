import React from 'react';
import { Button, Flex } from "@chakra-ui/react";
import styles from "./TopNavBar.module.css";

import algs from "../../data/algs.json";
import usages from "../../data/usages.json";
import words from "../../data/words.json";

interface TopNavBarProps {
  setChanges: (changeType: string[] | { name: string; implementation: string; description?: string }) => void;
}

type Category = "words" | "usages" | "algorithms";

interface AlgorithmData {
  name: string;
  description: string;
  implementation: string;
}

interface UsageData {
  name: string;
  implementation: string;
}

interface DataType {
  words: string[];
  usages: UsageData[];
  algorithms: AlgorithmData[];
}

const data: DataType = {
  words: words.words,
  usages: usages.usages,
  algorithms: Object.values(algs.algorithms)
};

export const TopNavBar: React.FC<TopNavBarProps> = ({ setChanges }) => {
  
  const randomSelection = (cat: Category): () => void => {
    return () => {
      if (cat === "words") {
        const shuffled = [...data.words].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 30);
        setChanges(selected);
      } else if (cat === "usages") {
        const randomItem = data.usages[Math.floor(Math.random() * data.usages.length)];
        setChanges(randomItem);
      } else {
        const randomItem = data.algorithms[Math.floor(Math.random() * data.algorithms.length)];
        setChanges(randomItem);
      }
    };
  };
  
  return (
    <Flex className={styles.Bar}>
      <Button onClick={randomSelection("words")}>Words</Button>
      <Button onClick={randomSelection("usages")}>Usages</Button>
      <Button onClick={randomSelection("algorithms")}>Algorithms</Button>
    </Flex>
  );
};
