import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Upload: React.FC<{ handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void }> = ({ handleFileUpload }) => {
    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid grey' }}>
            <Typography>Upload file for display</Typography>
            <Box sx={{ marginTop: 2 }}>
            <Button variant="contained" component="label">
                Upload
                <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            </Box>
        </Box>
    );
};

export default Upload;