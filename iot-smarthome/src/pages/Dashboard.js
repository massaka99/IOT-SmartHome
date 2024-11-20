import React from 'react';
import { Grid, Container, Typography, Paper } from '@mui/material';
import SensorCard from '../components/dashboard/SensorCard';
import { useSensorData } from '../hooks/useSensorData';
import { COLLECTIONS } from '../services/sensorService';
import { SENSOR_TYPES } from '../constants/sensorTypes';
import MotionDetector from '../components/dashboard/MotionDetector';

const Dashboard = () => {
  const insideTemp = useSensorData(COLLECTIONS.INSIDE_TEMP);
  const insideHumidity = useSensorData(COLLECTIONS.INSIDE_HUMIDITY);
  const outsideTemp = useSensorData(COLLECTIONS.OUTSIDE_TEMP);
  const outsideHumidity = useSensorData(COLLECTIONS.OUTSIDE_HUMIDITY);
  const motionData = useSensorData(COLLECTIONS.OUTSIDE_MOTION);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        height: 'calc(100vh - 64px)',
        pt: 4,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Paper elevation={3} sx={{ 
        p: 2, 
        width: '100%',
        borderRadius: 2,
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'linear-gradient(to bottom, rgba(30,30,30,0.9), rgba(20,20,20,0.95))'
          : 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(250,250,250,0.95))',
        backdropFilter: 'blur(8px)',
        boxShadow: (theme) => theme.palette.mode === 'dark'
          ? '0 4px 20px 0 rgba(0,0,0,0.5)'
          : '0 4px 20px 0 rgba(0,0,0,0.1)',
      }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
          Smart Home Dashboard
        </Typography>

        <Grid container spacing={2}>
          {/* Motion Detection */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2,
                height: '100%',
                background: (theme) => 
                  theme.palette.mode === 'dark' 
                    ? 'rgba(0, 0, 0, 0.2)' 
                    : 'rgba(0, 0, 0, 0.02)',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom align="center">
                Motion Detection
              </Typography>
              <MotionDetector
                data={motionData.latestReading}
                loading={motionData.loading}
                isMotionDetected={motionData.latestReading?.value === true}
              />
            </Paper>
          </Grid>

          {/* Indoor Sensors */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2,
                height: '100%',
                background: (theme) => 
                  theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom align="center">
                Indoor Sensors
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <SensorCard
                    title="Inside Temperature"
                    value={insideTemp.latestReading?.value}
                    unit="°C"
                    timestamp={insideTemp.latestReading?.timestamp}
                    loading={insideTemp.loading}
                    type={SENSOR_TYPES.TEMPERATURE}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SensorCard
                    title="Inside Humidity"
                    value={insideHumidity.latestReading?.value}
                    unit="%"
                    timestamp={insideHumidity.latestReading?.timestamp}
                    loading={insideHumidity.loading}
                    type={SENSOR_TYPES.HUMIDITY}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Outdoor Sensors */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2,
                height: '100%',
                background: (theme) => 
                  theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom align="center">
                Outdoor Sensors
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <SensorCard
                    title="Outside Temperature"
                    value={outsideTemp.latestReading?.value}
                    unit="°C"
                    timestamp={outsideTemp.latestReading?.timestamp}
                    loading={outsideTemp.loading}
                    type={SENSOR_TYPES.TEMPERATURE}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SensorCard
                    title="Outside Humidity"
                    value={outsideHumidity.latestReading?.value}
                    unit="%"
                    timestamp={outsideHumidity.latestReading?.timestamp}
                    loading={outsideHumidity.loading}
                    type={SENSOR_TYPES.HUMIDITY}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;