import React from 'react';
import { Box, Progress } from '@chakra-ui/react';

const ProgressBar = ({ value }) => {
  return (
    <Box width="100%" p={4}>
      <Progress value={value} colorScheme="teal" size="md" isAnimated />
    </Box>
  );
};

export default ProgressBar;
