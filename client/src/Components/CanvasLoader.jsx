import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        width: '80%',
        position: 'fixed', // Make it fixed position
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: 'translate(-50%, -50%)', // Perfect centering
      }}
    >
      <Box sx={{ 
        width: '300px', 
        marginBottom: 2, 
        backgroundColor: '#89CFF0', 
        borderRadius: '10px'
      }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 20,
            borderRadius: 10,
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #004ff9, #101010)',
            },
          }}
        />
      </Box>
      <Typography
        variant="body2"
        color="#89CFF0"
        sx={{ color: '#ffffff', fontWeight: 800 }}
      >
        {progress !== 0 ? `${progress.toFixed(0)}%` : 'Loading...'}
      </Typography>
    </Html>
  );
};

export default CanvasLoader;