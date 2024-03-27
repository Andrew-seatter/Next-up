import mockJobs from "../../lib/mock-jobs";
import { Grid, Stack, Fab, useTheme } from "@mui/material";
import JobCard from "./JobCard";
import Sidebar from "../Navigation/Sidebar";
import MobileMenu from "../Navigation/MobileMenu";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./Dashboard.css";
import { useStore, updateStore } from "../../lib/store.js";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_JOBS, GET_USER } from "../../../utils/queries.js";
import auth from "../../../utils/auth.js";
import { Link } from "react-router-dom";


export const Dashboard = () => {
  const MOBILE_BREAKPOINT = "lg";
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT));


  const [store, setStore] = useStore();
  const [open, setOpen] = React.useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  let userDecoded = auth.getProfile();
  const username = userDecoded?.data?.username;

  //Tooltip
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  // Query to get jobs
  const { data, loading, error } = useQuery(GET_JOBS, {
    variables: { user_id: userDecoded?.data?._id },
  });
  if (error) {
    console.log("Error trying to get jobs");
    console.log(error);
  }

  // Query to get user
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER, {
    variables: { username: userDecoded?.data?.username },
  });

  let jobs;
  const MOCK = true;
  if (!loading) {
    if (error && MOCK) {
      jobs = mockJobs.slice(0, 8);
    } else {
      // console.log("DATA:", data)
      // console.log("JOBS:", jobs)
      jobs = data.jobs;
    }
  }

  // addjob function to update the global state when the "add" button is clicked
  const addJob = () => {
    updateStore(setStore, "activeJob", null);
    updateStore(setStore, "editModalIsOpen", true);
  };

  if (!auth.loggedIn())
    return (
      <>
        You are not logged in
        <br />
        <Link to="/">Log in</Link>
      </>
    );

  //function to get the number of jobs submitted this week for user and display a message
  let jobsThisWeek = userData?.user?.jobsThisWeek || 0;
  let jobMessage;
  if (jobsThisWeek < 3) {
    jobMessage = "Stay in the fire, you got this";
  } else if (jobsThisWeek < 10) {
    jobMessage = "Look at you go, keep it up";
  } else {
    jobMessage = "Let's throw a few out there";
  }

  return (
    //Contains aside and everything else
    <Grid
      className="dashboard"
      container
      spacing={3}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <Grid
        item
        xs={0}
        lg={2}
        style={{ backgroundColor: "white" }}
        id="white-bg"
      >
        {/* Display either sidebar or mobile menu */}
        <MobileMenu />
        <Sidebar />
      </Grid>

      {/* Everything Else */}
      <Grid item container xs={12} lg={10} alignContent="flex-start">
        <Grid item xs={12} sx={{ padding: "0px" }} id="dash">
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
          >
            <h2 className ='overview'>Overview</h2>
            <Fab
              style={{ backgroundColor: theme.palette.secondary.main }}
              aria-label="add"
              onClick={addJob}
              size="small"
            >

              <Tooltip
                disableFocusListener
                disableTouchListener
                title="Add a Job"
                placement="right-start"
                enterDelay={500}
                leaveDelay={200}
              >
                <AddIcon style={{ color: "white" }} />
              </Tooltip>
            </Fab>
          </Stack>
          <Stack direction="row" gap={4}>
            {/* WELCOME BOX */}
            <div className="welcome-box">
              <div className="welcome-banner">
                <h1 className="welcome-back-user">Welcome back, {username}</h1>
                <h3
                  className="jobssubmitted-thisweek"
                  style={{ textIndent: "10px" }}
                >
                  You submitted {jobsThisWeek} jobs this week. {jobMessage}!
                </h3>
              </div>
              <div className="books-img-box"></div>
            </div>
            {/* Calendar */}
            <LocalizationProvider 
              dateAdapter={AdapterDayjs}
              >
              <DateCalendar
                id="calendar"
                className="calendar"
                style={{ margin: 0, flexGrow: 2}}
                value={dayjs()}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Stack>
        </Grid>
        {/* RECENT JOBS */}
        <Stack
          className="recent-job-apps"
          sx={{ pt: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h4>Recent Job Applications</h4>
          {/* <Button variant="text">Show more</Button> */}
        </Stack>
        {/* Job Cards */}
        <Grid 
          container 
          id="job-cards" 
          spacing={2} 
          sx={{ pt: 2 }} 
          className= 'job-messages'
        >
          {loading && <> {loading ? "loading..." : null}</>}
          {/* only display 8 on the dashboard */}
          {data?.jobs?.length > 0 &&
            data?.jobs?.slice(0, 8).map((job, i) => {
              const key = `${job.jobTitle}-${i}`;
              return <JobCard key={key} job={job} />;
            })}
          {data?.jobs?.length === 0 && (
            <>You have not applied to any jobs. Add a job!</>
          )}
          {error && <>{error.message}</>}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
