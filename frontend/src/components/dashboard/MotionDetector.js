import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import MotionDetectIcon from '@mui/icons-material/DirectionsRun';
import '../../styles/components/MotionDetector.css';

const MotionDetector = ({ data, loading, isMotionDetected }) => {
  const motionActive = data?.status === "Motion detected";

  return (
    <div className={`motion-detector-wrapper ${motionActive ? 'motion-active' : ''}`}>
      <Paper 
        elevation={3}
        sx={{
          background: 'transparent !important',
          boxShadow: 'none'
        }}
      >
        <Box className="motion-icon-container">
          <MotionDetectIcon className="motion-icon" />
        </Box>
        <div className="motion-content">
          <Typography 
            variant="h6" 
            component="div" 
            className="motion-status"
          >
            {loading ? 'Loading...' : (motionActive ? 'Motion Detected!' : 'No Motion')}
          </Typography>
          {data?.timestamp && (
            <Typography variant="body2" className="motion-timestamp">
              Last updated: {new Date(data.timestamp).toLocaleString()}
            </Typography>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default MotionDetector;