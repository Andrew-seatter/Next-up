import { Grid, Stack, TextField } from "@mui/material";
import Sidebar from "../Navigation/Sidebar";

import SearchIcon from "@mui/icons-material/Search";

export default function AllJobs() {
  //     const [jobs, setJobs] = useState([]);
  //     const [loading, setLoading] = useState(true);

  //     useEffect(() => {
  //       // Fetch jobs data from database
  //       // Replace this with actual data fetching logic
  //       fetchJobs()
  //         .then(data => {
  //           setJobs(data);
  //           setLoading(false
  //         })
  //         .catch(error => {
  //           console.error('Error fetching jobs:', error);
  //           setLoading(false);
  //         });
  //     }, []);

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
