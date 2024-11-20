import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Smart Home Dashboard
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Motion Detection
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <MotionDetector
              data={motionData.latestReading}
              loading={motionData.loading}
              isMotionDetected={motionData.latestReading?.value === true}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Indoor Sensors
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <SensorCard
              title="Inside Temperature"
              value={insideTemp.latestReading?.value}
              unit="°C"
              timestamp={insideTemp.latestReading?.timestamp}
              loading={insideTemp.loading}
              type={SENSOR_TYPES.TEMPERATURE}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Outdoor Sensors
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <SensorCard
              title="Outside Temperature"
              value={outsideTemp.latestReading?.value}
              unit="°C"
              timestamp={outsideTemp.latestReading?.timestamp}
              loading={outsideTemp.loading}
              type={SENSOR_TYPES.TEMPERATURE}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
      </Box>
    </Container>
  );
};

export default Dashboard;