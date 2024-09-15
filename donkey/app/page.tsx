"use client";
import React, { useState } from "react";
import styles from "./Page.module.css";
import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { TopNavBar } from "./TopNavBar/TopNavBar";

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
    <Flex
      className={styles.MainLayout}
      direction="column"
      alignItems="center"
      p={6}
      // bgGradient="linear(to-r, teal.600, green)"
      minHeight="100vh"
    >
      <Text
        fontSize="70px"
        mb={4}
        fontWeight="bold"
        // bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        animation="fadeIn 1s"
        color="white"
      >
        donkeycode
      </Text>

      <TopNavBar setChanges={handleChanges} />

      <Box
        mt={6}
        p={6}
        // bg="white"
        borderRadius="lg"
        boxShadow="lg"
        width="60%"
        transition="all 0.3s ease"
        // _hover={{ transform: "scale(1.05)" }}
      >
        {selectedItem && (
          <Box mt={4} className={styles.Response}>
            {selectedItem.type === "words" && (
              <Box>
                {/* <Text fontWeight="bold" fontSize="2xl" color="purple">
                  Selected words:
                </Text> */}
                <Text
                  mt={2}
                  fontSize="lg"
                  color="#92969b;
"
                >
                  {(selectedItem.content as string[]).join(", ")}
                </Text>
              </Box>
            )}
            {selectedItem.type === "usage" && (
              <Box>
                <Text fontWeight="bold" fontSize="2xl" color="blue.600">
                  {(selectedItem.content as { name: string }).name}
                </Text>
                <Text
                  as="pre"
                  mt={2}
                  fontSize="lg"
                  bg="gray.100"
                  p={4}
                  borderRadius="md"
                  color="#92969b"
                >
                  {
                    (selectedItem.content as { implementation: string })
                      .implementation
                  }
                </Text>
              </Box>
            )}
            {selectedItem.type === "algorithm" && (
              <Box>
                <Text fontWeight="bold" fontSize="2xl" color="teal.600">
                  {(selectedItem.content as { name: string }).name}
                </Text>
                <Text mt={2} fontSize="lg">
                  {
                    (selectedItem.content as { description: string })
                      .description
                  }
                </Text>
                <Text
                  as="pre"
                  mt={2}
                  fontSize="lg"
                  bg="gray.100"
                  p={4}
                  borderRadius="md"
                  color="#92969b"
                >
                  {
                    (selectedItem.content as { implementation: string })
                      .implementation
                  }
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Flex>
  );
}
