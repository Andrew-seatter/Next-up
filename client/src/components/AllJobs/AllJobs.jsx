import { Grid, Stack, TextField } from "@mui/material";
import Sidebar from "../Navigation/Sidebar";
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../../../utils/queries.js';
import auth from "../../../utils/auth.js";
import jwt_decode from 'jwt-decode';
import SearchIcon from "@mui/icons-material/Search";

const AllJobs = () =>  {
  const token = auth.getProfile();

  if (!token) {
    console.error('No token found');
  }

  let userDecoded = auth.getProfile();
  const user_id = userDecoded?.data?._id;

  if (!userDecoded) {
    console.error('No token found');
  }

  const { loading, error, data } = useQuery(GET_JOBS, {
    variables: { user_id: user_id },
  });

  console.log("All jobs:", data?.jobs)

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Grid container spacing={4}>
        {/* Aside */}
        <Grid item xs={2} className="sidebar-container">
          <Sidebar />
        </Grid>
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <h1>All My Jobs</h1>
          {/* <div style={{ position: "relative" }}>
            <TextField placeholder="Search" />
            <SearchIcon
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                translate: "0 -50%",
                opacity: 0.5,
              }}
            />
          </div> */}
        </Stack>
      </Grid>
    </>
  );
}

export default AllJobs;