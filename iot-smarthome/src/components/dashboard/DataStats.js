import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { format } from 'date-fns';

const DataStats = ({ data, unit, isMotion }) => {
  if (!data || data.length === 0) return null;

  if (isMotion) {
    const motionEvents = data.filter(d => d.status === "Motion detected").length;
    const lastMotion = data.find(d => d.status === "Motion detected");
    
    return (
      <Box sx={{ mb: 2, display: 'flex', gap: 4 }}>
        <Typography>
          Total Motion Events: {motionEvents}
        </Typography>
        {lastMotion && (
          <Typography>
            Last Motion: {format(new Date(lastMotion.timestamp), 'PPpp')}
          </Typography>
        )}
      </Box>
    );
  }

  const values = data.map(d => d.value);
  const min = Math.min(...values).toFixed(1);
  const max = Math.max(...values).toFixed(1);
  const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Min</Typography>
          <Typography variant="h6">{min}{unit}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Avg</Typography>
          <Typography variant="h6">{avg}{unit}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Max</Typography>
          <Typography variant="h6">{max}{unit}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataStats;