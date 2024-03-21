import "../HomePage/Home.css";
import { AppBar, Box } from "@mui/material";
import { Grid, Stack, Fab, Button, Link, Chip, } from "@mui/material";


export const Home = () => {
  return (
    <Grid container spacing={3} className="homepage-container">
      <Grid>
        <AppBar
          className="navbar"
          style={{ boxShadow: "0px", backgroundColor: "transparent" }}
        >
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Link href="/login">
            <Chip
              label="Login"
              color="primary"
              variant="outlined"
              className="filled"
            />
          </Link>
        </Stack>
      </AppBar>
    </Grid>
    <Stack className="next-up-container">
    <Box className="next-up-container">
      <div className="next-up-arrow"></div>
      <div className="next-up-logo"></div>
      </Box>
    </Stack>
    </Grid>
  );
};

export default Home;
