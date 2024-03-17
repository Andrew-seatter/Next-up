import { useStore, updateStore } from '../../lib/store'
import { TextField} from '@mui/material'

export default function EditModal({ close }) {
    const [store, setStore] = useStore()
 
  return (
    <>
        <h3>Im the modal</h3>
        <TextField
          id="outlined-helperText"
          label="Job Title"
          defaultValue={store.activeJob.jobTitle}
        />
          <TextField
          id="outlined-helperText"
          label="Company Name"
          defaultValue={store.activeJob.companyName}
        />
         <TextField
          id="outlined-helperText"
          label="Date Applied"
          defaultValue={store.activeJob.dateApplied}
        />
        <TextField
          id="outlined-helperText"
          label="Status"
          defaultValue={store.activeJob.status}
        />
        <TextField
          id="outlined-helperText"
          label="Contact Name"
          defaultValue={store.activeJob.contact}
        />
         <TextField
          id="outlined-number"
          label="Stars"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <TextField
          id="outlined-multiline-static"
          label="Notes"
          multiline
          rows={6}
          defaultValue={store.activeJob.notes}
        />
        <button onClick={close}>
          X
        </button>
    </>
  )
}