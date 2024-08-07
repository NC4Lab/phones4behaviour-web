import { Link } from 'react-router-dom';
import { Button, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Display from './components/Display';
import Upload from './components/Upload';
import Files from './components/Files';
import Logs from './components/Logs';

interface FileData {
    filename: string;
    filepath: string;
    filetype: string;
    file?: File;
}

export default function Commands() {
    const baseUrl = "http://127.0.0.1:5000"; // localhost
    const filesUrl = `${baseUrl}/files`;
    
    const [files, setFiles] = useState<FileData[]>([]);

    useEffect(() => {
        axios.get<FileData[]>(filesUrl)
        .then(res => {
            const fetchedFiles = res.data.map(file => ({
                ...file,
                filetype: getFileType(file.filename)
            }));
            setFiles(fetchedFiles);
        }).catch(err => {
            console.error("Error fetching data:", err);
        });
    }, [filesUrl]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post(filesUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res.data);
                setFiles(prevFiles => [
                    ...prevFiles,
                    { 
                        filename: file.name, 
                        filepath: `uploads/${file.name}`,
                        filetype: getFileType(file.name),
                        file: file
                    }
                ]);
            }).catch(err => {
                console.error("Error uploading file:", err);
            });
        }
    };

    const getFileType = (filename: string): string => {
        const extension = filename.split('.').pop()?.toLowerCase();
        if (!extension) return 'unknown';
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) return 'image';
        if (['mp3', 'wav', 'aac', 'flac'].includes(extension)) return 'audio';
        if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) return 'video';
        return 'unknown';
    };

    const images = files.filter(file => file.filetype === 'image');
    const audios = files.filter(file => file.filetype === 'audio');
    const videos = files.filter(file => file.filetype === 'video');

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Box sx={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <Link to="/">
                    <Button variant="contained">Back</Button>
                </Link>
            </Box>
            <Grid item lg={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingLeft: 10, paddingRight: 5, paddingBottom: 5 }}>
                <Upload handleFileUpload={handleFileUpload}/>
            </Grid>
            <Grid item lg={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingRight: 10, paddingLeft: 5, paddingBottom: 5 }}>
                <Display baseUrl={baseUrl} images={images} audios={audios} videos={videos}/> 
            </Grid>
            <Grid item lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, paddingLeft: 10, paddingRight: 5, paddingTop: 5 }}>
                <Files files={files}/>
            </Grid>
            <Grid item lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, paddingRight: 10, paddingLeft: 5, paddingTop: 5 }}>
                <Logs files={files}/>
            </Grid>
        </Grid>
    );
}
