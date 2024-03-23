import '../HomePage/Home.css';
import { AppBar, Box } from '@mui/material';
import { Grid, Stack, Fab, Button, Link, Chip, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid container spacing={3} className='homepage-container'>
      <Grid>

{/* Displays Login in AppBar on larger screens */}
      {!isMobile && (
  <AppBar
    className='navbar'
    style={{ boxShadow: '0px', backgroundColor: 'transparent' }}
  >
    <Stack
            className='login-container'
            direction='row'
            justifyContent='flex-end'
            spacing={1}
          >
            <Box>
              <Link href='/login'>
                <Chip
                  label='Login'
                  color='primary'
                  variant='outlined'
                  className='filled'
                />
              </Link>
            </Box>
          </Stack>
  </AppBar>
)}

{/* Displays Login in center on mobile screens */}
{isMobile && (
          <Box
            className='mobile-login-container'
            padding={2} // Adjust padding as needed
          >
            <Link href='/login'>
              <Chip
                label='Login'
                color='primary'
                variant='outlined'
              />
            </Link>
          </Box>
        )}

      </Grid>
      <Stack className='next-up-container'>
        <Box className='next-up-container'>
          <div className='next-up-arrow'></div>
          <div className='next-up-logo'></div>
        </Box>
      </Stack>
    </Grid>
  );
};

export default Home;
