import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Typography, IconButton, Box, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SvgIcon from "@mui/material/SvgIcon";
import auth from "../../../utils/auth.js";
import { Stack } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../utils/queries.js";

// Home icon function
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let userDecoded = auth.getProfile();
  const username = userDecoded?.data?.username;

  const handleSignOut = () => {
    // Clear user session
    localStorage.removeItem("user");
    // Redirect to home page
    navigate("/");
  };

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER, {
    variables: { username: userDecoded?.data?.username },
  });

  return (
    <div>
      <Box
        sx={{
          width: { md: 250 }, // Full width on extra-small devices, 250px on small devices and up
          // overflow: "auto",
          maxHeight: "100vh",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh'
        }}

      >
        <div>
          <Stack direction="row" alignItems="center" fontSize="30px" gap={1} style={{paddingLeft: '1rem'}}>
            {/* <img
              src={arrow}
              alt=""
              className={styles.nextUpPurple}
              style={{
                width: "50px",
                height: "50px",
              }}
            /> */}
            <p> NEXT UP</p>
          </Stack>
          <ul className={styles.list}>
            {/* Navigation items */}
            <li>
              {location.pathname !== "/dashboard" && (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={3}
                  onClick={() => navigate("/dashboard")}
                  className={styles.link}
                >
                  <HomeIcon fontSize="medium" />
                  Dashboard
                </Stack>
              )}
            </li>
            <li>
              <Stack direction="row" alignItems="center" gap={3}>
                <WorkOutlineIcon className="alljobs-icon"></WorkOutlineIcon>
                <NavLink to="/allJobs" className={styles.link}>
                  All Jobs
                </NavLink>
              </Stack>
            </li>
            <li>
              <Stack direction="row" alignItems="center" gap={3}>
                <PieChartOutlineIcon></PieChartOutlineIcon>
                <NavLink to="/stats" className={styles.link}>
                  My Stats
                </NavLink>
              </Stack>
            </li>
            <li>
              <Stack direction="row" alignItems="center" gap={3}>
                <LaptopChromebookIcon></LaptopChromebookIcon>
                <NavLink to="/resources" className={styles.link}>
                  {" "}
                  Resources
                </NavLink>
              </Stack>
            </li>
          </ul>
        </div>

        {/* Sign-out divider */}
        <div className="signout-divider">
          <Divider />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", paddingTop: '20px', paddingBottom: '20px' }}>
            <Avatar
          variant="outlined"
          size="sm"         
         sx={{ bgcolor: '#5500E0' }}>{username[0]}</Avatar>

            <Box sx={{gap: 2, minWidth: 0, flex: 1}}>
              <Typography >{username}</Typography>
            {/* <Typography >{email}</Typography> */}
            </Box>
            <IconButton
              onClick={handleSignOut}
              className={styles.signOut}
              size="sm"
              variant="plain"
              color="neutral"
            >
              <LogoutRoundedIcon />
            </IconButton>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Sidebar;
