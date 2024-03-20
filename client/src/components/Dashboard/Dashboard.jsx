import mockJobs from "../../lib/mock-jobs";
import { Grid, Stack, Fab, Button } from "@mui/material";
import JobCard from "./JobCard";
import Sidebar from "../Navigation/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import CardMedia from '@mui/material/CardContent';
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./Dashboard.css";

import { useStore, updateStore } from "../../lib/store.js";
import { useQuery } from "@apollo/client";
import { GET_JOBS } from "../../../utils/queries.js";

import auth from "../../../utils/auth.js";

import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const [store, setStore] = useStore();

  let userDecoded = auth.getProfile()

  const { data, loading, error } = useQuery(GET_JOBS, { variables: { user_id: userDecoded?.data?._id }});
  if (error) {
    console.log("Error trying to get jobs")
    console.log(error)
  }

  let jobs;
  const MOCK = true;
  if (!loading) {
    if (error && MOCK) {
      jobs = mockJobs.slice(0, 8);
    } else {
      console.log("DATA:", data)
      // console.log("JOBS:", jobs)
      jobs = data.jobs;
    }
  }

  // addjob function to update the global state when the "add" button is clicked
  const addJob = () => {
    updateStore(setStore, "activeJob", null);
    updateStore(setStore, "editModalIsOpen", true);
  };

  if (!auth.loggedIn()) return (
    <>
      You are not logged in
      <br />
      <Link to='/login'>Log in</Link>
    </>
  )

  return (
    //Contains aside and everything else
    <Grid container spacing={3} style={{ margin: "-17px" }}>
      {/* Aside */}
      <Grid item xs={2} className="sidebar-container">
        <Sidebar />
      </Grid>

      {/* Everything Else */}
      <Grid item xs={10} id="dash">
        <Stack direction="row" alignItems="center" gap={2}>
          <h2>My Jobs</h2>
          <Fab color="secondary" aria-label="add" onClick={addJob} size="small">
            <AddIcon />
          </Fab>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <div className="welcome-banner">
            <h1>Welcome Banner</h1>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              className="calendar"
              style={{ margin: 0 }}
              defaultValue={dayjs()}
            />
          </LocalizationProvider>
        </Stack>
        <Stack className="recent-job-apps"sx={{ pt: 2 }} direction="row" justifyContent="space-between"  alignItems="center" >
          <h4>Recent Job Applications</h4>
          <Button variant="text">Show more</Button>
        </Stack>
        {/* Job Cards */}
        <Grid container id="job-cards" spacing={2} sx={{ pt: 2 }}>
          {loading && (
            <>  {loading ? <img src='spinner' alt="loading" /> : null}</>
          )}

          {data?.jobs?.length > 0 && (
            jobs.map((job, i) => {
              const key = `${job.jobTitle}-${i}`;
              return <JobCard key={key} job={job} />;
            })
          )}
          
          {data?.jobs?.length === 0 && (
            <>You have not applied to any jobs. Add a job!</>
          )}

          {error && (
            <>{error.message}</>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
