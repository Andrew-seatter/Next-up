import { 
    Card,
    CardContent,
    Grid,
} from '@mui/material';

import { useStore, updateStore } from '../../lib/store'

export default function JobCard({ job }) {

    const [store, setStore] = useStore()

    function editJob() {
        updateStore(setStore, 'activeJob', job)
        updateStore(setStore, 'editModalIsOpen', true)
    }

    return (
        <>        
            <Grid 
                item 
                xs={12}
                sm={6}
                md={4}
                lg={3}
            >
                <Card>
                    <CardContent>
                        <h3>{job.jobTitle}</h3>
                        <Grid container>
                            <Grid item xs={6}>
                                Company: {job.companyName}
                            </Grid>
                            <Grid item xs={6}>
                                Date applied: {job.dateApplied}
                            </Grid>
                            <Grid item xs={6}>
                                Stars: {job.stars}
                            </Grid>
                            <Grid item xs={6}>
                                Status: {job.status}
                            </Grid>
                        </Grid>
                        <button onClick={editJob}>
                            Edit
                        </button>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}