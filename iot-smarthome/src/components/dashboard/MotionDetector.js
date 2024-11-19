import React from 'react';
import { Paper, Typography } from '@mui/material';
import MotionDetectIcon from '@mui/icons-material/DirectionsRun';

const MotionDetector = ({ data, loading, isMotionDetected }) => {
  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: isMotionDetected ? '#ffebee' : '#e8f5e9',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}
    >
      <MotionDetectIcon 
        sx={{ 
          fontSize: 40,
          color: isMotionDetected ? '#f44336' : '#4caf50'
        }} 
      />
      <div>
        <Typography variant="h6" component="div">
          Status: {loading ? 'Loading...' : 
            (isMotionDetected ? 'Motion Detected!' : 'No Motion')}
        </Typography>
        {data?.timestamp && (
          <Typography variant="body2" color="text.secondary">
            Last updated: {new Date(data.timestamp).toLocaleString()}
          </Typography>
        )}
      </div>
    </Paper>
  );
};

export default MotionDetector;