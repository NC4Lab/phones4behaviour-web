import React from 'react';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';

interface FileData {
    filename: string;
    filepath: string;
    filetype: string;
}

const Files: React.FC<{ files: FileData[] }> = ({ files }) => {
    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid grey' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Filename</TableCell>
                            <TableCell>Filepath</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((file, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{file.filename}</TableCell>
                                <TableCell><a href={file.filepath} target="_blank" rel="noopener noreferrer">{file.filepath}</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Files;
