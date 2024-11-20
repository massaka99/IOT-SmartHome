import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, 
  ToggleButton, ToggleButtonGroup 
} from '@mui/material';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import HumidityChart from '../components/dashboard/HumidityChart';
import TimeRangeSelector from '../components/dashboard/TimeRangeSelector';
import DataStats from '../components/dashboard/DataStats';
import { useSensorData } from '../hooks/useSensorData';
import { COLLECTIONS } from '../services/sensorService';

const Graphs = () => {
  const [timeRange, setTimeRange] = useState(3600000);
  const [viewType, setViewType] = useState('temperature');
  const insideTemp = useSensorData(COLLECTIONS.INSIDE_TEMP);
  const outsideTemp = useSensorData(COLLECTIONS.OUTSIDE_TEMP);
  const insideHumidity = useSensorData(COLLECTIONS.INSIDE_HUMIDITY);
  const outsideHumidity = useSensorData(COLLECTIONS.OUTSIDE_HUMIDITY);

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewType(newView);
    }
  };

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
        p: 3, 
        borderRadius: 2,
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'linear-gradient(to bottom, rgba(30,30,30,0.9), rgba(20,20,20,0.95))'
          : 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(250,250,250,0.95))',
        backdropFilter: 'blur(8px)',
      }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sensor Graphs
        </Typography>

        <Box sx={{ 
          mb: 3, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2 
        }}>
          <ToggleButtonGroup
            value={viewType}
            exclusive
            onChange={handleViewChange}
            aria-label="view type"
            sx={{
              '& .MuiToggleButton-root': {
                px: 3,
                py: 1,
                borderRadius: '20px !important',
                border: 'none',
                mx: 0.5,
                backgroundColor: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              },
            }}
          >
            <ToggleButton value="temperature" aria-label="temperature view">
              Temperature
            </ToggleButton>
            <ToggleButton value="humidity" aria-label="humidity view">
              Humidity
            </ToggleButton>
          </ToggleButtonGroup>
          
          <TimeRangeSelector
            selectedRange={timeRange}
            onRangeChange={setTimeRange}
          />
        </Box>

        {/* Charts section */}
        <Grid container spacing={3}>
          {viewType === 'temperature' ? (
            <>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <DataStats data={insideTemp.data} unit="°C" />
                  <TemperatureChart 
                    data={insideTemp.data}
                    title="Indoor Temperature"
                    timeRange={timeRange}
                    loading={insideTemp.loading}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <DataStats data={outsideTemp.data} unit="°C" />
                  <TemperatureChart 
                    data={outsideTemp.data}
                    title="Outdoor Temperature"
                    timeRange={timeRange}
                    loading={outsideTemp.loading}
                  />
                </Paper>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <DataStats data={insideHumidity.data} unit="%" />
                  <HumidityChart 
                    data={insideHumidity.data}
                    title="Indoor Humidity"
                    timeRange={timeRange}
                    loading={insideHumidity.loading}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <DataStats data={outsideHumidity.data} unit="%" />
                  <HumidityChart 
                    data={outsideHumidity.data}
                    title="Outdoor Humidity"
                    timeRange={timeRange}
                    loading={outsideHumidity.loading}
                  />
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Graphs;