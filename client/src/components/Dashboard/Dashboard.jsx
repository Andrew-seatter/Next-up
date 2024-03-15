
import mockJobs from "../../lib/mock-jobs";
import { Grid } from "@mui/material";
import JobCard from "./JobCard";


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
