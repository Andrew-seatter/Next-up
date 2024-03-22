import styles from "../Stats/Stats.module.css";
import Sidebar from "../Navigation/Sidebar";

import { Grid, Box } from "@mui/material";

import BarChartCard from "./Charts/BarChart";
import PieChartCard from "./Charts/PieChart";
import LineChartCard from "./Charts/LineChart";
// import ScatterChartCard from "./Charts/ScatterChart";

export const Stats = () => {
  return (
    <Grid container spacing={3} style={{ margin: "-17px" }} justifyContent="center">
      {/* Aside */}
      <Grid item xs={2} className="sidebar-container">
        <Sidebar />
      </Grid>
      {/* Charts container */}
      <Grid item xs={10} id="dash" container justifyContent="center">
        <div className={styles.container}>
          <h1 className={styles.title}>Statistics Overview</h1>
          <Grid container spacing={3} justifyContent="center">
            {" "}
            {/* Define the Grid container and set spacing between items */}
            {/* Each chart is wrapped in a Grid item */}
            <Grid item xs={12}>
              <Box padding={2}>
                <h2>
                  Applications Over Time
                </h2>
                <LineChartCard />
                <p>
                  Number of applications submitted.
                </p>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box padding={2}>
                <h2>
                  Application Status
                </h2>
                <PieChartCard />
                <p>
                  Track the number of applications by status.
                </p>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box padding={2}>
                <h2>
                  Interview Success Rate
                </h2>
                <BarChartCard />
                <p>
                  Ratio of applications that lead to interviews.
                </p>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default Stats;
