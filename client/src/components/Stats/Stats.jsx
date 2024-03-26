import styles from '../Stats/Stats.module.css';
import Sidebar from '../Navigation/Sidebar';
import MobileMenu from '../Navigation/MobileMenu';
import React, { useState, useEffect } from 'react';

import {
  Grid,
  Box,
  Stack,
  IconButton,
  Drawer,
  Card,
  CardContent,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import OutputIcon from '@mui/icons-material/Output';

import BarChartCard from './Charts/BarChart';
import PieChartCard from './Charts/PieChart';
import LineChartCard from './Charts/LineChart';
import ScatterChartCard from './Charts/ScatterChart';

export const Stats = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container maxWidth='lg'>
      <Grid
        container
        spacing={3}
        style={{ margin: '-17px' }}
        justifyContent='center'
      >
        {/* Display either sidebar or mobile menu */}
        {isMobile ? (
          <MobileMenu />
        ) : (
          <Drawer
            variant='temporary'
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            <Sidebar />
          </Drawer>
        )}

        {/* Header container */}

        <Grid item xs={12} md={10} id='dash' container justifyContent='center'>
        <Grid item>
        {/* Open Sidebar Button */}
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
          sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
        >
          <OutputIcon />
          <p>Open Sidebar</p>
        </IconButton>
      </Grid>
      <Grid item xs>
        {/* Title Centered */}
        <Typography variant='h2' component='h3' gutterBottom textAlign="center">
          Statistics Overview
        </Typography>
      </Grid>
      <Grid item xs={1} /> {/* Placeholder to balance the grid layout */}
    </Grid>

{/* Charts Container */}
          <Grid container spacing={3} justifyContent='center'>
            {' '}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    Applications Over Time
                  </Typography>
                  <LineChartCard />
                  <Typography variant='body2' color='textSecondary'>
                    Number of applications submitted.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    Application Status
                  </Typography>
                  <PieChartCard />
                  <Typography variant='body2' color='textSecondary'>
                    Track the number of applications by status.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    Application Success Rate
                  </Typography>
                  <BarChartCard />
                  <Typography variant='body2' color='textSecondary'>
                    Ratio of applications that lead to interviews.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    Salary Distribution
                  </Typography>
                  <ScatterChartCard />
                  <Typography variant='body2' color='textSecondary'>
                    Expected salary range.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
    </Container>
  );
};

export default Stats;
