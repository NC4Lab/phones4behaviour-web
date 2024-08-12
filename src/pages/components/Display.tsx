import React, { useState } from 'react';
import { Box, Button, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FileData } from '../FileTypes';

interface DisplayProps {
    handleDisplay: (selectedImage: FileData | undefined, selectedAudio: FileData | undefined, selectedVideo: FileData | undefined) => void;
    images: FileData[];
    audios: FileData[];
    videos: FileData[];
}

const Display: React.FC<DisplayProps> = ({ handleDisplay, images, audios, videos }) => {

    console.log('Images:', images);
    console.log('Audios:', audios);
    console.log('Videos:', videos);

    const [selectedImage, setSelectedImage] = useState<FileData | undefined>();
    const [selectedAudio, setSelectedAudio] = useState<FileData | undefined>();
    const [selectedVideo, setSelectedVideo] = useState<FileData | undefined>();

    const handleImageChange = (event: SelectChangeEvent<string>) => {
        const selectedFilePath = event.target.value as string;
        const selectedFile = images.find(file => file.filePath === selectedFilePath);
        setSelectedImage(selectedFile);
    };
    
    const handleAudioChange = (event: SelectChangeEvent<string>) => {
        const selectedFilePath = event.target.value as string;
        const selectedFile = audios.find(file => file.filePath === selectedFilePath);
        setSelectedAudio(selectedFile);
    };
    
    const handleVideoChange = (event: SelectChangeEvent<string>) => {
        const selectedFilePath = event.target.value as string;
        const selectedFile = videos.find(file => file.filePath === selectedFilePath);
        setSelectedVideo(selectedFile);
    };

    const handleDisplayClick = () => {
        handleDisplay(selectedImage, selectedAudio, selectedVideo);
    };
    

    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid grey' }}>
            <Typography>Choose files to display (Image and/or Audio, or Video)</Typography>
            <FormControl sx={{ minWidth: 400, marginTop: 2 }} >
                <InputLabel>Image</InputLabel>
                <Select label="Image" value={selectedImage ? selectedImage.filePath : ''} onChange={handleImageChange}>
                    {images.map((file, idx) => (
                        <MenuItem key={idx} value={file.filePath}>{file.fileName}</MenuItem>
                    ))}
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 400, marginTop: 2 }} >
                <InputLabel>Audio</InputLabel>
                <Select label="Audio" value={selectedAudio ? selectedAudio.filePath : ''} onChange={handleAudioChange}>
                    {audios.map((file, idx) => (
                        <MenuItem key={idx} value={file.filePath}>{file.fileName}</MenuItem>
                    ))}
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 400, marginTop: 2 }} >
                <InputLabel>Video</InputLabel>
                <Select label="Video" value={selectedVideo ? selectedVideo.filePath : ''} onChange={handleVideoChange}>
                    {videos.map((file, idx) => (
                        <MenuItem key={idx} value={file.filePath}>{file.fileName}</MenuItem>
                    ))}
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" component="label" sx={{ marginTop: 2 }} onClick={handleDisplayClick}>
                Display
            </Button>
        </Box> 
    );
};

export default Display;
