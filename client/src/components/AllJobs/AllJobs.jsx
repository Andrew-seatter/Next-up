import { Grid, Stack, TextField } from "@mui/material";
import Sidebar from "../Navigation/Sidebar";
import { useQuery } from "@apollo/client";
import { GET_JOBS } from "../../../utils/queries.js";
import auth from "../../../utils/auth.js";
import jwt_decode from "jwt-decode";
import SearchIcon from "@mui/icons-material/Search";
import JobCard from "../Dashboard/JobCard";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";

const statusCategories = [
  "Pending",
  "Interviewed",
  "Applied",
  "Hired",
  "Rejected",
];

// AllJobs component
export const AllJobs = () => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const token = auth.getProfile();

  if (!token) {
    console.error("No token found");
  }

  let user = auth.getProfile();
  const user_id = user?.data?._id;

  if (!user) {
    console.error("No token found");
  }

  // Query to get jobs
  const { loading, error, data } = useQuery(GET_JOBS, {
    variables: { user_id: user_id },
  });

  console.log("All jobs:", data?.jobs);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Grid container spacing={3} style={{ margin: "-17px" }}>
        {/* Aside */}
        <Grid item xs={2} className="sidebar-container">
          <Sidebar />
        </Grid>

        {/* Everything Else */}
        <Grid item xs={10}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={4}
          >
            <h1>All My Jobs</h1>
            <div style={{ position: "relative" }}>
              <TextField label="Search by job title" />
              <SearchIcon
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  translate: "0 -50%",
                  opacity: 0.5,
                }}
              />
            </div>
            <div>
              <Autocomplete
                value={selectedStatus}
                onChange={(event, newValue) => {
                  if (newValue === null || statusCategories.includes(newValue)) {
                    setSelectedStatus(newValue);
                  }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={statusCategories}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Filter by status" />
                )}
              />
            </div>
          </Stack>
          {/* Jobs */}
          <Grid container id="job-cards" spacing={2} sx={{ pt: 2 }}>
            {loading && <> {loading ? "loading..." : null}</>}
            {data?.jobs?.map((job, i) => {
              const key = job._id || `${job.jobTitle}-${i}`;
              return <JobCard key={key} job={job} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AllJobs;
