import Sidebar from '../Navigation/Sidebar';
import MobileMenu from '../Navigation/MobileMenu';

import {
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import BarChartCard from './Charts/BarChart';
import PieChartCard from './Charts/PieChart';
import LineChartCard from './Charts/LineChart';
import ScatterChartCard from './Charts/ScatterChart';

export const Stats = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
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
        <Grid item xs={2} className='sidebar-container'>
          <Sidebar />
        </Grid>
      )}



      {/* Charts container */}
      <Grid item xs={10} container spacing={3} direction="column">
        {/* Title */}
        <Grid item>
          <Typography variant='h2' component='h3' gutterBottom textAlign="center">
            Statistics Overview
          </Typography>
        </Grid>

        {/* Charts */}

        <Grid item xs={10} container justifyContent='center' spacing={3}>


          {/* Line chart for applications over time */}
          <Grid item xs={12} md={6}>
            <Card style={{ minHeight: '400px' }}>
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

          {/* Pie chart for applications by status */}
          <Grid item xs={12} md={6}>
            <Card style={{ minHeight: '400px' }}>
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

          {/* Bar chart for application success rate */}
          <Grid item xs={12} md={6}>
            <Card style={{ minHeight: '400px' }}>
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

          {/* Scatter chart for salary distribution */}
          <Grid item xs={12} md={6}>
            <Card style={{ minHeight: '400px' }}>
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
    </Grid>
  );
};

export default Stats;
