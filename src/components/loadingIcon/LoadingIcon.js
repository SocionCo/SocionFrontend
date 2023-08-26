import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingIcon = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' // 100% of the viewport height
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIcon;
