"use client";
import React, { useState } from "react";
import styles from "./Page.module.css";
import { Flex, Text, Box } from "@chakra-ui/react";
import { TopNavBar } from "./TopNavBar/TopNavBar";
// import { TypeInterface } from "./PlayArea/TypeInterface";

interface SelectedItem {
  type: "words" | "usage" | "algorithm";
  content:
    | string[]
    | { name: string; implementation: string; description?: string };
}

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const handleChanges = (
    newItem:
      | string[]
      | { name: string; implementation: string; description?: string }
  ) => {
    if (Array.isArray(newItem)) {
      setSelectedItem({ type: "words", content: newItem });
    } else if ("description" in newItem) {
      setSelectedItem({ type: "algorithm", content: newItem });
    } else {
      setSelectedItem({ type: "usage", content: newItem });
    }
  };

  return (
    <Flex className={styles.MainLayout} direction="column">
      <Text fontSize="30" mb={4}>
        donkeycode
      </Text>

      <TopNavBar setChanges={handleChanges} />
      {/* <TypeInterface text={selectedItem} /> */}

      <div className={styles.PlayArea}>
        {selectedItem && (
          <Box mt={4}>
            {selectedItem.type === "words" && (
              <Box>
                <Text fontWeight="bold">Selected words:</Text>
                <Text mt={2}>
                  {(selectedItem.content as string[]).join(", ")}
                </Text>
              </Box>
            )}
            {selectedItem.type === "usage" && (
              <Box>
                <Text fontWeight="bold">
                  {(selectedItem.content as { name: string }).name}
                </Text>
                <Text as="pre" mt={2}>
                  {
                    (selectedItem.content as { implementation: string })
                      .implementation
                  }
                </Text>
              </Box>
            )}
            {selectedItem.type === "algorithm" && (
              <Box>
                <Text fontWeight="bold">
                  {(selectedItem.content as { name: string }).name}
                </Text>
                <Text mt={2}>
                  {
                    (selectedItem.content as { description: string })
                      .description
                  }
                </Text>
                <Text as="pre" mt={2}>
                  {
                    (selectedItem.content as { implementation: string })
                      .implementation
                  }
                </Text>
              </Box>
            )}
          </Box>
        )}
      </div>
    </Flex>
  );
}
