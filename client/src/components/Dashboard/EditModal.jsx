import { useStore, updateStore } from "../../lib/store";
import { TextField, Grid, Stack, Checkbox, InputLabel, MenuItem, Select } from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {useMutation} from '@apollo/client';
import { ADD_JOB, ADD_USER, UPDATE_JOB } from "../../../utils/mutations";
import auth from "../../../utils/auth";

export default function EditModal({ close }) {
  const [store, setStore] = useStore();
  const [addJob, {data: addJobData, error: addJobError, loading: addJobLoading}] = useMutation(ADD_JOB)
  const [updateJob, {data: updateJobData, error: updateJobError, loading: updateJobLoading}] = useMutation(UPDATE_JOB)

  const handleUpdateJob = (formData) => {
    // do form validation before this
    console.log(formData)
    updateJob({variables: {
      input: formData,
      jobId: store?.activeJob?._id
    }})
  };

  const handleAddJob = (formData) => {
    // do form validation before this
    console.log(formData)
    addJob({variables: {input: formData}})
  };

  if (!addJobError) {
    console.log("Error adding job!", addJobError)
    if (addJobError?.message) alert(addJobError?.message)
  }

  if (addJobData && !addJobError) {
    location.reload()
  }

  if (!updateJobError) {
    console.log("Error updating job!", updateJobError)
    if (updateJobError?.message) alert(updateJobError?.message)
  }

  if (updateJobData && !updateJobError) {
    location.reload()
  }

  return (
    <form 
        onSubmit={(e) => {
          e.preventDefault()
          // trick for turning form data into an object

          const formData = {
            ...Object.fromEntries(new FormData(e.target)),
            user_id: auth.getProfile()?.data?._id
          }
          console.log("formData:", formData)
          formData.followUp = formData.followUp === 'on'
          formData.stars = Number(formData.stars) || 0
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
        <button onClick={close}>X</button>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Job Title"
            defaultValue={store?.activeJob?.jobTitle || ""}
            name="jobTitle"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Company Name"
            defaultValue={store?.activeJob?.companyName || ""}
            name="companyName"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Contact Name"
            defaultValue={store?.activeJob?.contact || ""}
            name="contactName"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Date Applied"
            defaultValue={store?.activeJob?.createdAt || ""}
            name="createdAt"
          />

        <Grid item xs={6}>
          <span>Followed up?</span>
          <Checkbox
            id="outlined-number"
            label="Follow-up date"
            type="checkbox"
            defaultChecked={store?.activeJob?.followUp}
            name="followUp"
          />
        </Grid>

        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-helperText"
            label="Status"
            defaultValue={store?.activeJob?.status || ""}
            name="status"
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            id="outlined-number"
            label="Stars"
            type="number"
            defaultValue={store?.activeJob?.stars || ""}
            name="stars"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-number"
            label="Application URL"
            type="text"
            defaultValue={store?.activeJob?.appUrl || ""}
            name="appUrl"
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink htmlFor="icon-select">Icon</InputLabel>
          <Select
            label="Icon"
            inputProps={{
              id: 'icon-select'
            }}
            defaultValue='facebook'
            name='companyIcon'
          >
            <MenuItem value="facebook">Facebook</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Notes"
            style={{ width: "100%" }}
            multiline
            rows={6}
            defaultValue={store?.activeJob?.notes || ""}
            name="note"
          />
        </Grid>
      </Grid>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <button>
        Save
      </button>
    </form>
  );
}
