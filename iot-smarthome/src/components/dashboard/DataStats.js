import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const DataStats = ({ data, unit }) => {
  if (!data || data.length === 0) return null;

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