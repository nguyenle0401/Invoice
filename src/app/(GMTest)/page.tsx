'use client';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(GMTest)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(GMTest)/components/dashboard/SalesOverview';
import ProductPerformance from '@/app/(GMTest)/components/dashboard/ProductPerformance';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
