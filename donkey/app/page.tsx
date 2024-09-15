"use client";
import React, { useState } from "react";
import styles from "./Page.module.css";
import { Flex, Text, Box } from "@chakra-ui/react";
import { TopNavBar } from "./TopNavBar/TopNavBar";
import { TypeInterface } from "./PlayArea/TypeInterface";

type WordsContent = string[];

interface UsageContent {
  name: string;
  implementation: string;
}

interface AlgorithmContent extends UsageContent {
  description: string;
}

type Content = WordsContent | UsageContent | AlgorithmContent;

interface SelectedItem {
  type: "words" | "usage" | "algorithm";
  content: Content;
}

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const handleChanges = (newItem: Content) => {
    if (Array.isArray(newItem)) {
      setSelectedItem({ type: "words", content: newItem });
    } else if ("description" in newItem) {
      setSelectedItem({ type: "algorithm", content: newItem });
    } else {
      setSelectedItem({ type: "usage", content: newItem });
    }
  };

  const renderContent = () => {
    if (!selectedItem) return null;

    switch (selectedItem.type) {
      case "words":
        return <TypeInterface text={(selectedItem.content as WordsContent).join(' ')} />;
      case "usage":
        return (
          <Box>
            <Text fontWeight="bold">
              {(selectedItem.content as UsageContent).name}
            </Text>
            <TypeInterface text={(selectedItem.content as UsageContent).implementation} />
          </Box>
        );
      case "algorithm":
        return (
          <Box>
            <Text fontWeight="bold">
              {(selectedItem.content as AlgorithmContent).name}
            </Text>
            <Text mt={2}>
              {(selectedItem.content as AlgorithmContent).description}
            </Text>
            <TypeInterface text={(selectedItem.content as AlgorithmContent).implementation} />
          </Box>
        );
    }
  };

  return (
    <Flex className={styles.MainLayout} direction="column">
      <Text fontSize="30" mb={4}>
        donkeycode
      </Text>

      <TopNavBar setChanges={handleChanges} />

      <div className={styles.PlayArea}>
        {renderContent()}
      </div>
    </Flex>
  );
}
