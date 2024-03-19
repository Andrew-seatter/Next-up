import {
  Card,
  CardContent,
  Grid,
  Fab,
  Stack,
  Typography,
  Badge,
} from "@mui/material";

import './JobCard.css'
import EditIcon from "@mui/icons-material/Edit";
import { useStore, updateStore } from "../../lib/store";

export default function JobCard({ job }) {
  const [store, setStore] = useStore();

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
              gap={2}
              style={{ pt: 3 }}
              sx={{ flexWrap: 'wrap' }}
            >
              <Badge  classes={{ badge: 'custom-badge' }} badgeContent={job.status} color={job.status}>
                <img
                  src={`https://picsum.photos/seed/${Math.random()}/50/50`}
                  style={{ width: "50px" }}
                  alt=""
                />
              </Badge>
              <h3 style={{ margin: 0 }} fontSize="large">{job.jobTitle}</h3>
            </Stack>
            <Stack direction="column" justifyContent="flex-end" gap = {.5}>
                <Typography style={{ marginTop: '15px' }} fontSize="large"> 
                    Company: {job.companyName} 
                </Typography>
                <Typography style={{ marginBottom: '5px' }} fontSize="large">
                    Date Applied: {job.dateApplied}
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" >
                <Fab aria-label="edit" onClick={editJob} size="small">
                    <EditIcon fontSize="small" color='primary'/>
                </Fab>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
