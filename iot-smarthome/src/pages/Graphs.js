import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import HumidityChart from '../components/dashboard/HumidityChart';
import TimeRangeSelector from '../components/dashboard/TimeRangeSelector';
import DataStats from '../components/dashboard/DataStats';
import { useSensorData } from '../hooks/useSensorData';
import { COLLECTIONS } from '../services/sensorService';

const Graphs = () => {
  const [timeRange, setTimeRange] = useState(3600000); // 1 hour default
  const insideTemp = useSensorData(COLLECTIONS.INSIDE_TEMP);
  const outsideTemp = useSensorData(COLLECTIONS.OUTSIDE_TEMP);
  const insideHumidity = useSensorData(COLLECTIONS.INSIDE_HUMIDITY);
  const outsideHumidity = useSensorData(COLLECTIONS.OUTSIDE_HUMIDITY);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sensor Graphs
      </Typography>

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

export default Graphs;