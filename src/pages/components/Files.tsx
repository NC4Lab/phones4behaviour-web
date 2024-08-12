import React from 'react';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import { FileData } from '../FileTypes';

const Files: React.FC<{ files: FileData[], baseUrl: string }> = ({ files, baseUrl }) => {
    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid grey' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Path</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((file, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{file.fileName}</TableCell>
                                <TableCell><a href={`${baseUrl}/${file.filePath}`} target="_blank" rel="noopener noreferrer">{file.filePath}</a></TableCell>
                                <TableCell>{file.fileType}</TableCell>
                                <TableCell>{file.uploadTime}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Files;
