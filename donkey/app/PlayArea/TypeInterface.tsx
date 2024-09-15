import { Box, Text } from "@chakra-ui/react";

interface TypeInterfaceProps {
  text: Record<string, any>;
}

const TypeInterface: React.FC<TypeInterfaceProps> = ({ text }) => {
  return (
    <div>
      {text && (
        <Box mt={4}>
          {text.type === "words" && (
            <Box>
              <Text fontWeight="bold">Selected words:</Text>
              <Text mt={2}>{(text.content as string[]).join(", ")}</Text>
            </Box>
          )}
          {text.type === "usage" && (
            <Box>
              <Text fontWeight="bold">
                {(text.content as { name: string }).name}
              </Text>
              <Text as="pre" mt={2}>
                {(text.content as { implementation: string }).implementation}
              </Text>
            </Box>
          )}
          {text.type === "algorithm" && (
            <Box>
              <Text fontWeight="bold">
                {(text.content as { name: string }).name}
              </Text>
              <Text mt={2}>
                {(text.content as { description: string }).description}
              </Text>
              <Text as="pre" mt={2}>
                {(text.content as { implementation: string }).implementation}
              </Text>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};
