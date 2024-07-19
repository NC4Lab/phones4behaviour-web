import { Link } from 'react-router-dom';
import { Button, Grid, Typography, Box, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface ResponseData {
    command: string;
    commandfile: string;
    commandtime: string;
    response: string;
    responsefile: string;
    responsetime: string;
}

export default function Commands() {
    const url = import.meta.env.VITE_API_URL as string; 
    const [responses, setResponses] = useState<ResponseData[]>([]);

    useEffect(() => {
        axios.get<ResponseData[]>(url)
        .then(res => {
            setResponses(res.data);
        })
        .catch(err => {
            console.error("Error fetching data:", err);
        });
    }, [url]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          console.log(file);
        }
      };

    return (
        <Grid container sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <Box sx={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <Link to="/">
                    <Button variant="contained">Back</Button>
                </Link>
            </Box>
            <Grid item lg={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid grey' }}>
                <Typography>upload file for display</Typography>
                <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" component="label">
                    upload
                    <input type="file" hidden onChange={handleFileUpload} />
                </Button>
                </Box>            
            </Grid>
            <Grid item lg={6} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '5px solid grey', padding: 10 }}>
                <TableContainer>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Command</TableCell>
                        <TableCell>Command File</TableCell>
                        <TableCell>Command Time</TableCell>
                        <TableCell>Response</TableCell>
                        <TableCell>Response File</TableCell>
                        <TableCell>Response Time</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {responses.map((r, idx) => (
                        <TableRow key={idx}>
                        <TableCell>{r.command}</TableCell>
                        <TableCell>{r.commandfile}</TableCell>
                        <TableCell>{r.commandtime}</TableCell>
                        <TableCell>{r.response}</TableCell>
                        <TableCell>{r.responsefile}</TableCell>
                        <TableCell>{r.responsetime}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
