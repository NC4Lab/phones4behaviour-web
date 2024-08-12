import React, { useState } from 'react';
import { Box, Button, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { FileData, LogData } from '../FileTypes';

interface DisplayProps {
    baseUrl: string;
    images: FileData[];
    audios: FileData[];
    videos: FileData[];
    logs: LogData[];
}

const Display: React.FC<DisplayProps> = ({ baseUrl, images, audios, videos, logs }) => {
    // console.log('Images:', images);
    // console.log('Audios:', audios);
    // console.log('Videos:', videos);

    const displayUrl = `${baseUrl}/uploads/display`;

    const [selectedImage, setSelectedImage] = useState<FileData>();
    const [selectedAudio, setSelectedAudio] = useState<FileData>();
    const [selectedVideo, setSelectedVideo] = useState<FileData>();

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
        const displayTime = new Date().toISOString();
        const selectedFiles = [];

        if ((selectedVideo && selectedImage) || (selectedVideo && selectedAudio)) {
            alert('Please select an image and/or audio, or a video');
            return;
        }

        if (selectedVideo) {
            selectedFiles.push({
                fileName: selectedVideo.fileName,
                displayTime: displayTime
            });
        } else {
            if (selectedImage) {
                selectedFiles.push({
                    fileName: selectedImage.fileName,
                    displayTime: displayTime
                });
            }
            if (selectedAudio) {
                selectedFiles.push({
                    fileName: selectedAudio.fileName,
                    displayTime: displayTime
                });
            }
        }

        if (selectedFiles.length === 0) {
            alert('Please select an image and/or audio, or a video');
            return;
        }

        axios.post(displayUrl, { files: selectedFiles })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error posting files:', error);
            });
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
