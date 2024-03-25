import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import SvgIcon from '@mui/material/SvgIcon';
import Button from '@mui/material/Button';
import logo from './nextup-lightpurple.webp';
import arrow from './next-up-arrow.png';

import { Stack, Box } from '@mui/material';

// Home icon function
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
    </SvgIcon>
  );
}

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    // Clear user session
    localStorage.removeItem('user');
    // Redirect to home page
    navigate('/');
  };

  return (
    <div>
      <Box
        sx={{
          width: { md: 250 }, // Full width on extra-small devices, 250px on small devices and up
          overflow: 'auto',
          maxHeight: '100vh',
        }}
      >
        <div>
          <Stack direction='row' alignItems='center' fontSize='30px' gap={1}>
            <img
              src={arrow}
              alt=''
              className={styles.nextUpPurple}
              style={{
                width: '30px',
                height: '30px',
                paddingLeft: '20px',
              }}
            />
            <p> NEXT UP</p>
          </Stack>
          <ul className={styles.list}>
            {/* Navigation items */}
            <li>
              {location.pathname !== '/dashboard' && (
                <Stack
                  direction='row'
                  alignItems='center'
                  gap={3}
                  onClick={() => navigate('/dashboard')}
                  className={styles.link}
                >
                  <HomeIcon fontSize='large' />
                  Profile
                </Stack>
              )}
            </li>
            <li>
              <Stack direction='row' alignItems='center' gap={3}>
                <WorkOutlineIcon className='alljobs-icon'></WorkOutlineIcon>
                <NavLink to='/allJobs' className={styles.link}>
                  All Jobs
                </NavLink>
              </Stack>
            </li>
            <li>
              <Stack direction='row' alignItems='center' gap={3}>
                <PieChartOutlineIcon></PieChartOutlineIcon>
                <NavLink to='/stats' className={styles.link}>
                  My Stats
                </NavLink>
              </Stack>
            </li>
            <li>
              <Stack direction='row' alignItems='center' gap={3}>
                <LaptopChromebookIcon></LaptopChromebookIcon>
                <NavLink to='/resources' className={styles.link}>
                  {' '}
                  Resources
                </NavLink>
              </Stack>
            </li>
          </ul>
        </div>
        <div className='signout-btn'>
          <Button
            variant='outlined'
            onClick={handleSignOut}
            className={styles.signOut}
          >
            Sign out
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Sidebar;
