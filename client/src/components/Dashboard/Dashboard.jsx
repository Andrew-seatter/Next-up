
import mockJobs from "../../lib/mock-jobs";
import { Grid } from "@mui/material";
import JobCard from "./JobCard";
import Sidebar from "../Navigation/Sidebar";


export const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Sidebar />
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
