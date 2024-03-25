import mockJobs from '../../lib/mock-jobs';
import {
  Grid,
  Stack,
  Fab,
  Button,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import OutputIcon from '@mui/icons-material/Output';
import JobCard from './JobCard';
import Sidebar from '../Navigation/Sidebar';
import MobileMenu from '../Navigation/MobileMenu';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './Dashboard.css';
import { useStore, updateStore } from '../../lib/store.js';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_JOBS, GET_USER } from '../../../utils/queries.js';
import auth from '../../../utils/auth.js';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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
    console.log('Error trying to get jobs');
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
    updateStore(setStore, 'activeJob', null);
    updateStore(setStore, 'editModalIsOpen', true);
  };

  if (!auth.loggedIn())
    return (
      <>
        You are not logged in
        <br />
        <Link to='/login'>Log in</Link>
      </>
    );

  //function to get the number of jobs submitted this week for user and display a message
  let jobsThisWeek = userData?.user?.jobsThisWeek || 0;
  let jobMessage;
  if (jobsThisWeek < 3) {
    jobMessage = 'Stay in the fire, you got this';
  } else if (jobsThisWeek < 10) {
    jobMessage = 'Look at you go, keep it up';
  } else {
    jobMessage = "Let's throw a few out there";
  }

  return (
    //Contains aside and everything else
    <Grid
      container
      spacing={3}
      sx={{ margin: '-17px', width: '100%', overflow: 'hidden' }}
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

      {/* Everything Else */}
      <Grid item xs={12} sm={9} md={10} sx={{ padding: '20px' }} id='dash'>
        <Stack direction='row' alignItems='center' gap={2}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { xs: 'none', sm: 'none', md: 'block' } }}
          >
            <OutputIcon />
            <p>Open Sidebar</p>
          </IconButton>

          <h2 style={{ paddingLeft: '20px' }}>My Jobs</h2>

          <Fab color='secondary' aria-label='add' onClick={addJob} size='small'>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title='Add a Job'
              placement='right-start'
              enterDelay={500}
              leaveDelay={200}
            >
              <AddIcon />
            </Tooltip>
          </Fab>
        </Stack>

        <Stack direction='row' gap={4}>
          <div className='welcome-box'>
            <div className='welcome-banner'>
              <h1>Welcome back, {username}</h1>

              <h3 style={{ textIndent: '20px' }}>
                You submitted {jobsThisWeek} jobs this week. {jobMessage}!
              </h3>
            </div>
            <div className='books-img-box'></div>
          </div>
          {/* Calendar */}
          {!isMobile && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                className='calendar'
                style={{ margin: 0 }}
                value={dayjs()}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          )}
        </Stack>
      </Grid>
      <Grid>
        <Stack
          className='recent-job-apps'
          sx={{ pt: 2 }}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <h4>Recent Job Applications</h4>
          {/* <Button variant="text">Show more</Button> */}
        </Stack>
        {/* Job Cards */}
        <Grid container id='job-cards' spacing={2} sx={{ pt: 2 }}>
          {loading && <> {loading ? 'loading...' : null}</>}

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
