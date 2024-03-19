import { useStore, updateStore } from '../../lib/store'
import { TextField, 
  Grid, 
  Stack
} from '@mui/material'

export default function EditModal({ close }) {
    const [store, setStore] = useStore();

    const updateJob = () => {
      alert('edited job')
    }
  
    const addJob = () => {
      alert('added job')
    }
  
 
  return (
    <>
      <Stack direction="row"justifyContent="space-between">
        <h3>Job Information</h3>
        <button onClick={close}>X</button>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <TextField
              id="outlined-helperText"
              label="Job Title"
              defaultValue={store?.activeJob?.jobTitle||""}
            />
        </Grid>
        <Grid item xs={6}>
              <TextField
              id="outlined-helperText"
              label="Company Name"
              defaultValue={store?.activeJob?.companyName||""}
            />
          </Grid>
          <Grid item xs={6}>
              <TextField
                id="outlined-helperText"
                label="Date Applied"
                defaultValue={store?.activeJob?.dateApplied||""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-helperText"
                label="Status"
                defaultValue={store?.activeJob?.status||""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-helperText"
                label="Contact Name"
                defaultValue={store?.activeJob?.contact||""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-number"
                label="Stars"
                type="number"
                defaultValue={store?.activeJob?.stars||""}
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
                style={{width: '100%'}}
                multiline
                rows={6}
                defaultValue={store?.activeJob?.notes||""}
              />
            </Grid>
        </Grid>
        <button onClick={()=>{
        if (store?.activeJob) {
          //  we're editing -> call updateJob
          updateJob()
        } else {
          // we're adding -> call addJob
          addJob()
        }
      }}>
        Save
      </button>
    </>
  )
}