import {
  Card,
  CardContent,
  Grid,
  Fab,
  Stack,
  Typography,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import "./JobCard.css";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useStore, updateStore } from "../../lib/store";
import { lighten } from "@mui/system";

import { createElement } from "react";

//jobCard component
export default function JobCard({ job }) {
  const theme = useTheme();
  const lighterColor = lighten(theme.palette.yellow.main, 0.3);
  const [store, setStore] = useStore();

  // Function to edit job
  function editJob() {
    updateStore(setStore, "activeJob", job);
    updateStore(setStore, "editModalIsOpen", true);
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className="job-cards">
          <CardContent>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <Badge
                classes={{ badge: "custom-badge" }}
                badgeContent={job.status}
                color={job.status}
                style={{
                  pt: 3,
                  width: "85px",
                  height: "60px",
                  marginTop: "15px",
                }}
              >
                <img
                  src="/arrowPurple.png"
                  style={{ width: "60px", height: "60px" }}
                  alt=""
                />
              </Badge>
              <h3 style={{ margin: 0, fontSize: "24" }}>{job.jobTitle}</h3>
            </Stack>
            <Stack direction="column" justifyContent="flex-end" gap={0.5}>
              <Typography style={{ marginTop: "25px", fontSize: "20px" }}>
                Company: {job.companyName}
              </Typography>
              <Typography style={{ fontSize: "20px" }}>
                Date Applied: {job.dateString}
              </Typography>
            </Stack>

            <Grid>
              <Tooltip
                title="Edit"
                enterDelay={500}
                leaveDelay={200}
                placement="top-end"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Fab
                    aria-label="edit"
                    onClick={editJob}
                    size="small"
                    variant="outlined"
                    sx={{
                      background: "transparent",
                      borderColor: theme.palette.secondary.main,
                    }}
                  >
                    <EditIcon fontSize="small" color="secondary" />
                  </Fab>
                </Stack>
              </Tooltip>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
