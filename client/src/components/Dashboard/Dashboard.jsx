import mockJobs from "../../lib/mock-jobs";
import { Grid } from "@mui/material";
import JobCard from "./JobCard";
/*
    Array.map is an array method that returns a new array based on an old one.
    const numbers = [1, 2, 3]
    const doubles = numbers.map(n => n*2)
        [2, 4, 6]

    ``  template string
    ${} template literal

    Bootstrap breakpoints
        xs
        sm
        md
        lg
        xl
*/

export const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        SIDE-BAR
      </Grid>
      <Grid item xs={9}>
        <Grid container id="job-cards" spacing={2}>
          {mockJobs.map((job, i) => {
            const key = `${job.jobTitle}-${i}`;
            return <JobCard key={key} job={job} />;
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
