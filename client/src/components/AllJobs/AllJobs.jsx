import { Grid, Stack, TextField, useTheme } from '@mui/material';
import Sidebar from '../Navigation/Sidebar';
import MobileMenu from '../Navigation/MobileMenu';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../../../utils/queries.js';
import auth from '../../../utils/auth.js';
import jwt_decode from 'jwt-decode';
import SearchIcon from '@mui/icons-material/Search';
import JobCard from '../Dashboard/JobCard';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState } from 'react';

const statusCategories = [
  'All',
  'Pending',
  'Interviewed',
  'Applied',
  'Hired',
  'Rejected',
  'Follow-up',
];

// AllJobs component
export const AllJobs = () => {
  const [filterBy, setFilterBy] = useState('All');
  const [searchQuery, setSearchQuery] = useState(null);
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const token = auth.getProfile();

  if (!token) {
    console.error('No token found');
  }

  let user = auth.getProfile();
  const user_id = user?.data?._id;

  if (!user) {
    console.error('No token found');
  }

  // Query to get jobs
  const { loading, error, data } = useQuery(GET_JOBS, {
    variables: { user_id: user_id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // filter jobs
  let jobs = [];
  if (data?.jobs) {
    jobs = data.jobs;
    if (filterBy.toLowerCase() !== 'all') {
      jobs = jobs.filter((j) => j.status === filterBy);
    }
    if (searchQuery) {
      jobs = jobs.filter((j) =>
        j.jobTitle.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    console.log(filterBy, searchQuery, jobs);
  }

  return (
    <>
      <Grid container spacing={3} style={{ margin: '-17px' }}>
        {/* Display either sidebar or mobile menu */}

        <MobileMenu />

        <Grid 
          item xs={0} 
          lg={2} 
          className='sidebar-container'
          sx={{
            xs: {
              display: 'none'
            },
            lg: {
              display: 'block'
            }
          }}
        >

          <Sidebar />
        </Grid>


        {/* Everything Else */}
        <Grid item xs={10}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }} // 'column' layout for 'xs' screens and 'row' for 'sm' screens and up
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            gap={2} // Adjust the gap to ensure proper spacing on both layouts
            sx={{ width: '100%', mb: 2 }} // Ensure the Stack takes full width and add margin-bottom for spacing
          > <h2> My jobs</h2>
          <Stack direction='row' gap={5}>
            <div style={{ position: 'relative' }}>
              <TextField
              style={{
                // borderRadius: '20px'
              }}
                label='Search by job title'
                onInput={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <SearchIcon
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  translate: '0 -50%',
                  opacity: 0.5
                }}
              />
            </div>
            <div>
              <Autocomplete
                // value={selectedStatus}
                onChange={(event, newValue) => {
                  setFilterBy(newValue.toLowerCase());
                }}
                // inputValue={inputValue}
                id='controllable-states-demo'
                options={statusCategories}
                sx={{ width: 300 }}
                disableClearable
                renderInput={(params) => (
                  <TextField {...params} label='Filter by status' />
                )}
              />
            </div>
            </Stack>
          </Stack>
          {/* Jobs */}
          <Grid container id='job-cards' spacing={2} sx={{ pt: 2 }}>
            {loading && 'loading...'}
            {jobs.length
              ? jobs.map((job) => {
                  return <JobCard key={job._id} job={job} />;
                })
              : 'No jobs found'}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AllJobs;
