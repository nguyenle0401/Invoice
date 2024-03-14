'use client';
import { Grid, Paper } from "@mui/material";
import BaseCard from '@/app/(GMTest)/components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import InvoiceList from "./_component/InvoiceList";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });


// import ProductPerfomance from "@/app/(GMTest)/components/dashboard/ProductPerformance";

const Tables = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <InvoiceList />
      </Grid>
    </Grid>
  );
};

export default Tables;