import mockJobs from "../../lib/mock-jobs";
import { 
  Grid, 
  Stack, 
  Fab 
} from "@mui/material";
import JobCard from "./JobCard";
import Sidebar from "../Navigation/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./Dashboard.css";

import { useStore, updateStore } from "../../lib/store.js";
import { useQuery } from "@apollo/client";
import { GET_JOBS } from '../../../utils/queries.js'

export const Dashboard = () => {
   const [store, setStore] = useStore();
 
   const { data, loading, error } = useQuery(GET_JOBS)
 
   let jobs
   const MOCK = true 
   if (!loading) {
     if (error && MOCK) {
       jobs = mockJobs.slice(0, 8)
     } else {
       jobs = data.jobs
     }
   }
 
   // addjob function to update the global state when the "add" button is clicked
   const addJob = () => {
     updateStore(setStore, "activeJob", null);
     updateStore(setStore, "editModalIsOpen", true);
   };
 
  return (
    //Contains aside and everything else
    <Grid container spacing={3} style={{ margin: '-17px'}} >
      {/* Aside */}
      <Grid item xs={2} className='sidebar-container'>
        <Sidebar />
      </Grid>

      {/* Everything Else */}
      <Grid item xs={10} id="dash">
        <Stack direction="row" alignItems="center" gap= {2}>
            <h2>My Jobs</h2>
            <Fab color="secondary" aria-label="add" onClick={addJob} size="small">
              <AddIcon />
            </Fab>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap = {4}>
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
          <Stack sx={{ pt: 2 }}>
          <h4 className='recent-job-apps'>Recent Job Applications</h4>
        </Stack>   

        {/* Job Cards */}
        <Grid container id="job-cards" spacing={2} sx={{ pt: 2}}>
          {(!loading) ? (
            jobs.map((job, i) => {
              const key = `${job.jobTitle}-${i}`;
              return <JobCard key={key} job={job} />;
            })
            ) : (
              <>
                Loading your jobs...
              </>
            )}
          {mockJobs.map((job, i) => {
            const key = `${job.jobTitle}-${i}`;
            return <JobCard key={key} job={job} />;
          })
        }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
