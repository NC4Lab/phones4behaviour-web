import React from 'react';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import { LogData } from '../FileTypes';

const Logs: React.FC<{ logs: LogData[] }> = ({ logs }) => {
    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid grey' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tag</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{log.tag}</TableCell>
                                <TableCell>{log.desc}</TableCell>
                                <TableCell>{log.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Logs;
