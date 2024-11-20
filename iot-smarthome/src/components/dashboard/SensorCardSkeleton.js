import { Skeleton, Paper, Box } from '@mui/material';

const SensorCardSkeleton = () => (
  <Paper sx={{ p: 2 }}>
    <Skeleton variant="text" width="60%" height={32} />
    <Box sx={{ mt: 2 }}>
      <Skeleton variant="text" width="40%" height={48} />
    </Box>
    <Skeleton variant="text" width="80%" height={24} />
  </Paper>
);

export default SensorCardSkeleton;
