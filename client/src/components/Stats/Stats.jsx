import styles from '../Stats/Stats.module.css';

import { Grid } from '@mui/material';

import BarChartCard from './Charts/BarChart';
import PieChartCard from './Charts/PieChart';
import LineChartCard from './Charts/LineChart';
import ScatterChartCard from './Charts/ScatterChart';

export const Stats = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Statistics Overview</h1>
            <Grid container spacing={2}> {/* Define the Grid container and set spacing between items */}
                {/* Each chart is wrapped in a Grid item */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Applications Over Time</h2>
                    <LineChartCard />
                    <p>Line or Bar chart: Track the number of applications submitted over a certain period (weekly, monthly, quarterly).</p>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Application Status</h2>
                    <PieChartCard />
                    <p>Pie chart: Track the number of applications by status (applied, interviewed, etc).</p>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Response Rate</h2>
                    <PieChartCard />
                    <p>Pie chart: Percentage of applications that received a response.</p>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Interview Success Rate</h2>
                    <BarChartCard />
                    <p>Bar chart: Ratio of interviews that led to job offers.</p>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Applications by Job Role</h2>
                    <BarChartCard />
                    <p>Bar chart: Distribution of applications by different roles/industries.</p>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Salary Trends</h2>
                    <ScatterChartCard />
                    <p>Line chart or Scatter Plot: Track offered or expected salaries, or compare both.</p>
                </Grid>
            </Grid>
        </div>

    );
}

export default Stats;