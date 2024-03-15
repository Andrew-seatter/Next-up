import { 
    Card,
    CardContent,
    Grid
} from '@mui/material';


export default function JobCard({ job }) {
    return (
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
                            Contact person: {job.contact}
                        </Grid>
                        <Grid item xs={6}>
                            Stars: {job.stars}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}