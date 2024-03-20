import { useStore, updateStore } from "../../lib/store";
import { TextField, Grid, Stack } from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {useMutation} from '@apollo/client';
import { ADD_JOB, ADD_USER } from "../../../utils/mutations";

export default function EditModal({ close }) {
  const [store, setStore] = useStore();
  const [addJob, {data: addJobData, error: addJobError, loading: addJobLoading}] = useMutation(ADD_JOB)

  const updateJob = (form) => {
    alert("edited job");
  };

  const handleAddJob = (form) => {
    alert("added job");
  };

  return (
    <form 
        onSubmit={(e) => {
          e.preventDefault()
          if (store?.activeJob) {
            //  we're editing -> call updateJob
            updateJob(e.target);
          } else {
            // we're adding -> call addJob
            addJob(e.target);
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
            label="Date Applied"
            defaultValue={store?.activeJob?.dateApplied || ""}
            name="dateApplied"
          />
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
            id="outlined-helperText"
            label="Contact Name"
            defaultValue={store?.activeJob?.contact || ""}
            name="contactName"
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
        {/* <Grid item xs={6}>
              <InputLabel shrink htmlFor="icon-select">Icon</InputLabel>
              <Select
                label="Icon"
                inputProps={{
                  id: 'icon-select'
                }}
                defaultValue='facebook'
              >
                <MenuItem value="facebook">Facebook</MenuItem>
              </Select>
            </Grid> */}
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
