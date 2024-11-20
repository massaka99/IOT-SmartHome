import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Tooltip } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';

const SensorCard = ({ title, value, unit, timestamp, loading, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'temperature':
        return <ThermostatIcon sx={{ fontSize: 40, color: '#2196f3' }} />;
      case 'humidity':
        return <OpacityIcon sx={{ fontSize: 40, color: '#4caf50' }} />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ 
      minWidth: 275, 
      height: '100%',
      boxShadow: 3,
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)'
      }
    }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          {getIcon()}
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </div>
        
        {loading ? (
          <CircularProgress size={40} />
        ) : (
          <>
            <Tooltip title={`Last updated: ${new Date(timestamp).toLocaleString()}`}>
              <Typography variant="h4" className="sensor-value">
                {value}{unit}
              </Typography>
            </Tooltip>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Last updated: {timestamp ? new Date(timestamp).toLocaleTimeString() : 'Never'}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SensorCard;