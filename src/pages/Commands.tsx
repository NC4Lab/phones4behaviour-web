import { Link } from 'react-router-dom';
import { Button, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Display from './components/Display';
import Upload from './components/Upload';
import Files from './components/Files';
import Logs from './components/Logs';

import { FileData, LogData } from './FileTypes';

export default function Commands() {
    const baseUrl = "http://127.0.0.1:5000"; // localhost
    const uploadsUrl = `${baseUrl}/uploads`;
    const displayUrl = `${baseUrl}/uploads/display`;
    const logsUrl = `${baseUrl}/logs`;
    
    const [files, setFiles] = useState<FileData[]>([]);
    const [logs, setLogs] = useState<LogData[]>([]);

    useEffect(() => {
        axios.get<FileData[]>(uploadsUrl)
        .then(res => {
            console.log("fetched files:", res.data);

            const fileInfo = res.data.map(file => ({
                fileName: file.file_name,
                filePath: file.file_path,
                fileType: file.file_type,
                uploadTime: file.upload_time
            }));

            setFiles(fileInfo);

            // setFiles(res.data);
        }).catch(err => {
            console.error("Error fetching data:", err);
        });
    }, [uploadsUrl]);


    useEffect(() => {
        axios.get<LogData[]>(logsUrl)
        .then(res => {
            console.log("fetched logs:", res.data);

            const logInfo = res.data.map(log => ({
                tag: log.tag,
                desc: log.desc,
                time: log.time,
            }));

            setLogs(logInfo);

            // setFiles(res.data);
        }).catch(err => {
            console.error("Error fetching data:", err);
        });
    }, [logsUrl]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
            const uploadTime = new Date().toString();
            const fileType = getFileType(file.name);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileType', fileType);
            formData.append('uploadTime', uploadTime);

            axios.post(uploadsUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res.data);
                setFiles(prevFiles => [
                    ...prevFiles,
                    { 
                        fileName: file.name, 
                        filePath: `uploads/${file.name}`,
                        fileType: fileType,
                        uploadTime: uploadTime
                    }
                ]);
            }).catch(err => {
                console.error("Error uploading file:", err);
            });

            const logData = {        
                tag: "Upload", 
                desc: `Uploaded ${file.name}`,
                time: uploadTime
            };
            
            axios.post(logsUrl,logData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res.data);
                setLogs(prevLogs => [
                    ...prevLogs,
                    logData
                ]);
            }).catch(err => {
                console.error("Error uploading file:", err);
            });
            
        }
    };

    const getFileType = (fileName: string): string => {
        // if (!fileName) return 'unknown';

        const extension = fileName.split('.').pop()?.toLowerCase();
        if (!extension) return 'unknown';
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
        if (['mp3', 'wav', 'flac', 'm4a'].includes(extension)) return 'audio';
        if (['mp4', 'mov', 'avi'].includes(extension)) return 'video';
        return 'unknown';
    };

    const images = files.filter(file => file.fileType.includes('image'));
    const audios = files.filter(file => file.fileType.includes('audio'));
    const videos = files.filter(file => file.fileType.includes('video'));

    const handleDisplayClick = (selectedImage: FileData | undefined, selectedAudio: FileData | undefined, selectedVideo: FileData | undefined) => {
        const displayTime = new Date().toString();
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

        const fileNames = selectedFiles.map(file => file.fileName).join(', ');

        const logData = {        
            tag: "Display", 
            desc: `Displayed ${fileNames}`,
            time: displayTime
        };

        axios.post(logsUrl,logData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data);
            setLogs(prevLogs => [
                ...prevLogs,
                logData
            ]);
        }).catch(err => {
            console.error("Error uploading file:", err);
        });
    };

    return (
        <Grid container sx={{ height: '100%' }}>
            <Box sx={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <Link to="/">
                    <Button variant="contained">Back</Button>
                </Link>
            </Box>
            <Grid item sm={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingLeft: 10, paddingRight: 5, paddingBottom: 5, height: '50vh' }}>
                <Upload handleFileUpload={handleFileUpload}/>
            </Grid>
            <Grid item sm={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingRight: 10, paddingLeft: 5, paddingBottom: 5, height: '50vh' }}>
                <Display handleDisplay={handleDisplayClick} images={images} audios={audios} videos={videos} /> 
            </Grid>
            <Grid item sm={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, paddingLeft: 10, paddingRight: 5, paddingTop: 5, height: '50vh' }}>
                <Files files={files} baseUrl={baseUrl}/>
            </Grid>
            <Grid item sm={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, paddingRight: 10, paddingLeft: 5, paddingTop: 5, height: '50vh' }}>
                <Logs logs={logs}/>
            </Grid>
        </Grid>
    );
}
