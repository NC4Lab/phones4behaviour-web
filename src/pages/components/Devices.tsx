import React from 'react';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { DeviceData } from '../FileTypes';

const Devices: React.FC<{ devices: DeviceData[] }> = ({ devices }) => {

    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid grey' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            {/* <TableCell>Name</TableCell> */}
                            <TableCell>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map((device, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{device.id}</TableCell>
                                <TableCell>{device.name}</TableCell>
                                <TableCell>            
                                    <Link to="/stream" target="_blank">
                                        <Button variant="outlined">stream</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Devices;