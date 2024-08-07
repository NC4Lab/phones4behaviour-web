import React, { useState } from 'react';
import { Box, Button, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

interface FileData {
    filename: string;
    filepath: string;
    filetype: string;
}

interface DisplayProps {
    baseUrl: string;
    images: FileData[];
    audios: FileData[];
    videos: FileData[];
}

const Display: React.FC<DisplayProps> = ({ baseUrl, images, audios, videos }) => {
    const displayUrl = `${baseUrl}/display`;

    const [selectedImage, setSelectedImage] = useState<FileData>();
    const [selectedAudio, setSelectedAudio] = useState<FileData>();
    const [selectedVideo, setSelectedVideo] = useState<FileData>();

    const handleImageChange = (event: SelectChangeEvent<string>) => {
        const selectedFilePath = event.target.value as string;
        const selectedFile = images.find(file => file.filepath === selectedFilePath);
        setSelectedImage(selectedFile);
    };
    
    const handleAudioChange = (event: SelectChangeEvent<string>) => {
        const selectedFilePath = event.target.value as string;
        const selectedFile = audios.find(file => file.filepath === selectedFilePath);
        setSelectedAudio(selectedFile);
    };
    
    const handleVideoChange = (event: SelectChangeEvent<string>) => {
        const selectedFilePath = event.target.value as string;
        const selectedFile = videos.find(file => file.filepath === selectedFilePath);
        setSelectedVideo(selectedFile);
    };

    const handleDisplayClick = () => {
        const selectedFiles = [];

        if (selectedVideo) {
            selectedFiles.push(selectedVideo.filename);
        } else {
            if (selectedImage) {
                selectedFiles.push(selectedImage.filename);
            }
            if (selectedAudio) {
                selectedFiles.push(selectedAudio.filename);
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
            <Select label="Image" value={selectedImage ? selectedImage.filepath : ''} onChange={handleImageChange}>
                {images.map((file, idx) => (
                    <MenuItem key={idx} value={file.filepath}>{file.filename}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 400, marginTop: 2 }} >
            <InputLabel>Audio</InputLabel>
            <Select label="Audio" value={selectedAudio ? selectedAudio.filepath : ''} onChange={handleAudioChange}>
                {audios.map((file, idx) => (
                    <MenuItem key={idx} value={file.filepath}>{file.filename}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 400, marginTop: 2 }} >
            <InputLabel>Video</InputLabel>
            <Select label="Video" value={selectedVideo ? selectedVideo.filepath : ''} onChange={handleVideoChange}>
                {videos.map((file, idx) => (
                    <MenuItem key={idx} value={file.filepath}>{file.filename}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button variant="contained" component="label" sx={{ marginTop: 2 }} onClick={handleDisplayClick}>
            Display
        </Button>
    </Box> 
    );
};

export default Display;
