import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Settings = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Data Collection
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Sensor data is collected every 5 minutes
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Storage
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Data is stored for up to 30 days
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;