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
  Slider,
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
import {
  ADD_JOB,
  ADD_USER,
  UPDATE_JOB,
  REMOVE_JOB,
} from "../../../utils/mutations";
import auth from "../../../utils/auth";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import numeral from "numeral";

const formatSalary = (val) => {
  return `$${numeral(val).format("0,0")}`;
};

import moment from "moment";
import dayjs from "dayjs";

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
const statuses = [
  "interviewed",
  "hired",
  "pending",
  "rejected",
  "applied",
  "follow-up",
];

// EditModal component
export default function EditModal({ close }) {
  const [store, setStore] = useStore();
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [salaryRange, setSalaryRange] = useState(null);
  const [companyIcon, setCompanyIcon] = useState(null);
  const [stars, setStars] = useState(null);
  const icon = 'arrowPurple.png'
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

  const formHandler = (e) => {
    e.preventDefault();

    // turning form data into an object
    const formData = {
      ...Object.fromEntries(new FormData(e.target)),
      user_id: auth.getProfile()?.data?._id,
    };
    console.log("formData:", formData);

    //handles date display on the front end, grabs the value off the calendar in the edit modal
    const formDateString = document.getElementById("dateString");

    formData.dateString = formDateString.value;
    formData.followUp = formData.followUp === "on";
    formData.stars = Number(formData.stars) || 0;

      // If the user did upload an icon, use the uploaded icon. Otherwise, it will use the initial icon.
    if (!formData.companyIcon) {
      formData.companyIcon = icon;
    } 
  
    if (salaryRange) {
      // If the user did not make any changes to the salaryRange, use the initial value from the database.Otherwise it will use the [0, 0] from the useState.
      const [low, high] = salaryRange;
      formData.salaryRangeLow = low;
      formData.salaryRangeHigh = high;
    } else {
      formData.salaryRangeLow = Number(store?.activeJob?.salaryRangeLow) || 0;
      formData.salaryRangeHigh = Number(store?.activeJob?.salaryRangeHigh) || 0;
    }
    delete formData.salaryRange;

    formData.desiredSalary = Number(formData.desiredSalary) || 0;
    if (store?.activeJob) {
      //  we're editing -> call updateJob
      handleUpdateJob(formData);
    } else {
      // we're adding -> call addJob
      handleAddJob(formData);
    }
    // Update the activeJob in the store
    updateStore(setStore, "activeJob", formData);
  };

  // Update job function to update the global state when the "save" button is clicked
  const handleUpdateJob = (formData) => {

    console.log(formData);
    updateJob({
      variables: {
        input: { ...formData },
        jobId: store?.activeJob?._id,
      },
    });
  };
  // Add job function to update the global state when the "add" button is clicked
  const handleAddJob = (formData) => {
    console.log("attempting to add job");
    console.log(formData);
    addJob({ variables: { input: { ...formData, companyIcon: "" } } });
  }

  const handleRemoveJob = (e) => {
    e.preventDefault();
    removeJob({
      variables: {
        jobId: store?.activeJob?._id,
        userId: auth.getProfile()?.data._id,
      },
    });
  };

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
    console.log("Error deleting job!", removeJobError);
    alert(removeJobError?.message);
  }
  if (removeJobData && !removeJobError) {
    location.reload();
  }

  // Return the form for the EditModal component
  const defaultSalaryRange = [
    Number(store?.activeJob?.salaryRangeLow) || 0,
    Number(store?.activeJob?.salaryRangeHigh) || 0,
  ];
  const defaultStars = Number(store?.activeJob?.stars) || 0;
  console.log('help')
  return (
    <form onSubmit={formHandler}>
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
            defaultValue={store?.activeJob?.companyName || ''}
            name="companyName"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Company Icon"
            defaultValue={store?.activeJob?.companyIcon || ''}
            name="companyIcon"
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
            label="Contact Info"
            defaultValue={store?.activeJob?.contactInfo || ""}
            name="contactInfo"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="dateString"
            label="Date Applied"
            defaultValue={dayjs(
              Number(store?.activeJob?.createdAt) || new Date()
            ).format("YYYY-MM-DD")}
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
          <Stack>
            <div style={{ fontSize: "0.8rem" }}>
              Salary range:{" "}
              {(salaryRange || defaultSalaryRange)
                .map((n) => "$" + n)
                .join(" - ")}
            </div>
            <Slider
              id="outlined-select-number"
              label="Salary Range"
              type="number"
              min={0}
              max={500000}
              defaultValue={defaultSalaryRange}
              name="salaryRange"
              valueLabelDisplay="auto"
              valueLabelFormat={formatSalary}
              required
              style={{ width: "100%" }}
              onChange={(e, val, activeThumb) => {
                setSalaryRange(val);
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack alignItems="center">
            <div style={{ textAlign: "center", fontSize: "0.8rem" }}>
              How do you feel about the job? <br />
              {customIcons[stars || defaultStars]?.label}
            </div>

            <StyledRating
              name="stars"
              type="number"
              size="large"
              defaultValue={defaultStars}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value].label}
              onChange={(e, val) => {
                setStars(val);
              }}
              highlightSelectedOnly
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <FormGroup>
            <FormControlLabel
              label="Followed-up?"
              // style={{ marginTop: 5 }}
              control={<Checkbox defaultChecked />}
            />
          </FormGroup>
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
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          type="button"
          onClick={handleRemoveJob}
        >
          Delete
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  )
}