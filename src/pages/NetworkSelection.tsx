import { Link } from 'react-router-dom';
import { Button, TextField, Grid, Typography } from '@mui/material';

export default function NetworkSelection() {
    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>Configure IP address and port</Typography>
            <TextField label="IP address" variant="filled" sx={{ marginTop: 3, marginBottom: 2 }}/>
            <TextField label="Port" variant="filled" sx={{ marginBottom: 3 }}/>
            <Link to="/commands">
                <Button variant="contained">enter</Button>
            </Link>
        </Grid>
    )
}