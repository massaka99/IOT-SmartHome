import React, { useState } from 'react';
import { Grid, Container, Typography, Box, Paper } from '@mui/material';
import SensorCard from '../components/dashboard/SensorCard';
import { useSensorData } from '../hooks/useSensorData';
import { COLLECTIONS } from '../services/sensorService';
import { SENSOR_TYPES } from '../constants/sensorTypes';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import HumidityChart from '../components/dashboard/HumidityChart';
import TimeRangeSelector from '../components/dashboard/TimeRangeSelector';
import DataStats from '../components/dashboard/DataStats';
import MotionDetector from '../components/dashboard/MotionDetector';

const Dashboard = () => {
  const insideTemp = useSensorData(COLLECTIONS.INSIDE_TEMP);
  const insideHumidity = useSensorData(COLLECTIONS.INSIDE_HUMIDITY);
  const outsideTemp = useSensorData(COLLECTIONS.OUTSIDE_TEMP);
  const outsideHumidity = useSensorData(COLLECTIONS.OUTSIDE_HUMIDITY);
  const motionData = useSensorData(COLLECTIONS.OUTSIDE_MOTION);

  const isMotionDetected = motionData.latestReading?.status === "Motion detected";

  const [timeRange, setTimeRange] = useState(3600000); // 1 hour default

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Smart Home Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Indoor Sensors
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SensorCard
              title="Inside Temperature"
              value={insideTemp.latestReading?.value}
              unit="°C"
              timestamp={insideTemp.latestReading?.timestamp}
              loading={insideTemp.loading}
              type={SENSOR_TYPES.TEMPERATURE}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
        <Typography variant="h5" gutterBottom>
          Outdoor Sensors
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SensorCard
              title="Outside Temperature"
              value={outsideTemp.latestReading?.value}
              unit="°C"
              timestamp={outsideTemp.latestReading?.timestamp}
              loading={outsideTemp.loading}
              type={SENSOR_TYPES.TEMPERATURE}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <TimeRangeSelector
          selectedRange={timeRange}
          onRangeChange={setTimeRange}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Temperature Trends
        </Typography>
        <Box sx={{ mb: 2 }}>
          <DataStats data={insideTemp.data} unit="°C" />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <TemperatureChart 
                data={insideTemp.data} 
                title="Indoor Temperature History"
                timeRange={timeRange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <TemperatureChart 
                data={outsideTemp.data} 
                title="Outdoor Temperature History"
                timeRange={timeRange}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Humidity Trends
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <HumidityChart 
                data={insideHumidity.data} 
                title="Indoor Humidity History"
                timeRange={timeRange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <HumidityChart 
                data={outsideHumidity.data} 
                title="Outdoor Humidity History"
                timeRange={timeRange}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;