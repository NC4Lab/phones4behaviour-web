import { Link } from 'react-router-dom';
import { Button, TextField, Grid, Typography } from '@mui/material';

export default function NetworkSelection() {
    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>configure ip and port</Typography>
            <TextField label="enter ip address" variant="filled" sx={{ marginTop: 3, marginBottom: 2 }}/>
            <TextField label="enter port" variant="filled" sx={{ marginBottom: 3 }}/>
            <Link to="/commands">
                <Button variant="contained">enter</Button>
            </Link>
        </Grid>
    )
}