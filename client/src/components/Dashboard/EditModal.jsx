import { useStore, updateStore } from "../../lib/store";
import React, { useState } from "react";
import {
  TextField,
  Grid,
  Stack,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  FormGroup,
  FormControlLabel,
  Slider
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { ADD_JOB, ADD_USER, UPDATE_JOB, REMOVE_JOB } from "../../../utils/mutations";
import auth from "../../../utils/auth";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import numeral from 'numeral'; 

const formatSalary = val => {
  return `$${numeral(val).format('0,0')}`
}

import moment from 'moment';


// Star icons for how excited user feels about the job
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

// Statuses for the job application
const statuses = ["interviewed", "hired", "pending", "rejected", "applied", "follow-up"];

// EditModal component
export default function EditModal({ close }) {
  const [store, setStore] = useStore();
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [
    addJob,
    { data: addJobData, error: addJobError, loading: addJobLoading },
  ] = useMutation(ADD_JOB);
  const [
    updateJob,
    { data: updateJobData, error: updateJobError, loading: updateJobLoading },
  ] = useMutation(UPDATE_JOB);
  const [
    removeJob,
    { data: removeJobData, error: removeJobError, loading: removeJobLoading },
  ] = useMutation(REMOVE_JOB);

  // Update job function to update the global state when the "save" button is clicked
  const handleUpdateJob = (formData) => {
    // do form validation before this
    console.log(formData);
    updateJob({
      variables: {
        input: {...formData, companyIcon: "image.svg"},
        jobId: store?.activeJob?._id,
      },
    });
  };

  // Add job function to update the global state when the "add" button is clicked
  const handleAddJob = (formData) => {
    console.log("attempting to add job")
    // do form validation before this
    console.log(formData);
    addJob({ variables: { input: {...formData, companyIcon: "image.svg"} } });
  };

  const handleRemoveJob = e => {
    e.preventDefault()
    removeJob({
      variables: {
        jobId: store?.activeJob?._id,
        userId: auth.getProfile()?.data._id
      }
    })
  }

  // add job actions
  if (addJobError?.message) {
    console.log("Error adding job!", addJobError);
    alert(addJobError?.message);
  }
  if (addJobData && !addJobError) {
    location.reload();
  }

  // update job actions
  if (updateJobError?.message) {
    console.log("Error updating job!", updateJobError);
    alert(updateJobError?.message);
  }
  if (updateJobData && !updateJobError) {
    location.reload();
  }

  // delete job actions
  if (removeJobError?.message) {
    console.log ("Error deleting job!", removeJobError);
    alert(removeJobError?.message);
  }
  if (removeJobData && !removeJobError) {
    location.reload();
  }

  // Return the form for the EditModal component
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        // turning form data into an object
        const formData = {
          ...Object.fromEntries(new FormData(e.target)),
          user_id: auth.getProfile()?.data?._id,
        };
        console.log("formData:", formData);
        formData.dateString = moment().toString();   
        formData.followUp = formData.followUp === "on";
        formData.stars = Number(formData.stars) || 0;

        // formData.salaryRange = Number(formData.salaryRange) || 0;
        const [low, high] = formData.salaryRange
        formData.salaryRangeLow = Number(low) || 0;
        formData.salaryRangeHigh = Number(high) || 0;

        formData.desiredSalary = Number(formData.desiredSalary) || 0;
        if (store?.activeJob) {
          //  we're editing -> call updateJob
          handleUpdateJob(formData);
        } else {
          // we're adding -> call addJob
          handleAddJob(formData);
        }
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <h3>Job Information</h3>
        <Tooltip
          title="Close"
          enterDelay={500}
          leaveDelay={200}
          placement="top-end"
        >
          <HighlightOffIcon fontSize="small" onClick={close}>
            X
          </HighlightOffIcon>
        </Tooltip>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Job Title"
            defaultValue={store?.activeJob?.jobTitle || ""}
            name="jobTitle"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Company Name"
            defaultValue={store?.activeJob?.companyName || ""}
            name="companyName"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Contact Name"
            defaultValue={store?.activeJob?.contactName || ""}
            name="contactName"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Date Applied"
            defaultValue={store?.activeJob?.createdAt || ""}
            name="createdAt"
            type="date"
            style={{ width: "100%" }}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-select-number"
            label="Application URL"
            type="text"
            defaultValue={store?.activeJob?.appUrl || ""}
            name="appUrl"
          />
        </Grid>
        <Grid item xs={6}>
          <Slider
            id="outlined-select-number"
            label="Salary Range"
            type="number"
            min={0}
            max={500000}
            defaultValue={[
              Number(store?.activeJob?.salaryRangeLow) || 0,
              Number(store?.activeJob?.salaryRangeHigh) || 0
            ]}
            name="salaryRange"
            valueLabelDisplay="auto"
            valueLabelFormat={formatSalary}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-select-number"
            label="Desired Salary"
            type="number"
            defaultValue={Number(store?.activeJob?.desiredSalary) || 0}
            name="desiredSalary"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-select"
            select
            label="Status"
            style={{ width: "100%" }}
            defaultValue={store?.activeJob?.status || ""}
            onChange={(event) => setSelectedStatus(event.target.value)}
            name="status"
            required
          >
            {statuses.map((status) => (
              <MenuItem value={status} key={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          xs={12}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item xs={6}>
            <StyledRating
              name="stars"
              type="number"
              size="large"
              style={{ marginLeft: 20, marginTop: 5 }}
              defaultValue={Number(store?.activeJob?.stars) || 0}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value].label}
              highlightSelectedOnly
            />
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                label="Followed-up?"
                style={{ marginLeft: 30, marginTop: 5 }}
                control={<Checkbox defaultChecked />}
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Notes"
            style={{ width: "100%", marginBottom: 20 }}
            multiline
            rows={6}
            defaultValue={store?.activeJob?.notes || ""}
            name="note"
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent={"space-between"}>
        <Button variant="outlined" startIcon={<DeleteIcon />} type="button" onClick={handleRemoveJob}>
          Delete
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
