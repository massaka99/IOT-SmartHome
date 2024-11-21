import React from 'react';
import { Container, Paper, Typography, Grid, Box } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const Home = () => {
  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Motion Detection',
      description: 'Real-time motion detection with instant notifications for enhanced security.'
    },
    {
      icon: <DeviceThermostatIcon sx={{ fontSize: 40 }} />,
      title: 'Temperature Monitoring',
      description: 'Precise indoor and outdoor temperature tracking for optimal comfort.'
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40 }} />,
      title: 'Humidity Control',
      description: 'Monitor humidity levels to maintain a healthy living environment.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Real-time Updates',
      description: 'Instant sensor data updates with historical tracking and analysis.'
    }
  ];

  return (
    <Container maxWidth="lg" className="home-container">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          Welcome to Smart Home Monitor
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 2
              }}>
                {feature.icon}
                <Typography variant="h5" component="h2" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home; 