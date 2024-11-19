import React from 'react';
import {Grid, Paper, Typography } from '@mui/material';

const DataStats = ({ data, unit }) => {
  const stats = React.useMemo(() => {
    if (!data?.length) return { min: 0, max: 0, avg: 0 };
    
    const values = data.map(d => d.value);
    return {
      min: Math.min(...values).toFixed(1),
      max: Math.max(...values).toFixed(1),
      avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
    };
  }, [data]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper sx={{ p: 1, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Min</Typography>
          <Typography variant="h6">{stats.min}{unit}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ p: 1, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Avg</Typography>
          <Typography variant="h6">{stats.avg}{unit}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ p: 1, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Max</Typography>
          <Typography variant="h6">{stats.max}{unit}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DataStats;