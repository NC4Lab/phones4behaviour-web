import React, { useState } from 'react';
import { Box, Button, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

interface FileData {
    filename: string;
    filepath: string;
    filetype: string;
    file?: File;
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
        console.log("Selected image:", selectedFile?.file);
        setSelectedImage(selectedFile);
    };
    
    const handleAudioChange = (event: SelectChangeEvent<string>) => {
        const selectedFilePath = event.target.value as string;
        const selectedFile = audios.find(file => file.filepath === selectedFilePath);
        console.log("Selected audio:", selectedFile?.file);
        setSelectedAudio(selectedFile);
    };
    
    const handleVideoChange = (event: SelectChangeEvent<string>) => {
        const selectedFilePath = event.target.value as string;
        const selectedFile = videos.find(file => file.filepath === selectedFilePath);
        console.log("Selected video:", selectedFile?.file);
        setSelectedVideo(selectedFile);
    };

    const handleDisplayClick = () => {
        console.log("Selected image:", selectedImage?.filepath);
        console.log("Selected audio:", selectedAudio?.filepath);
        console.log("Selected video:", selectedVideo?.filepath);

        const formData = new FormData();
    
        if (selectedVideo) {
            if (selectedVideo.file) {
                console.log("Appending video:", selectedVideo.file.name);
                formData.append('video', selectedVideo.file);
            }
        } else if (selectedImage || selectedAudio) {
            if (selectedImage && selectedImage.file) {
                console.log("Appending image:", selectedImage.file.name);
                formData.append('image', selectedImage.file);
            }
            if (selectedAudio && selectedAudio.file) {
                console.log("Appending audio:", selectedAudio.file.name);
                formData.append('audio', selectedAudio.file);
            }
        } else {
            alert('Please select an image and/or audio, or a video');
            return;
        }
    
        axios.post(displayUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
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
