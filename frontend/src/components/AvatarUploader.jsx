import React from "react";
import Axios from 'axios';
import { useState } from "react";
import { uploadToCloudinary } from "../util/cloudinaryUpload";
import { Avatar, Box, Button, CircularProgress } from '@mui/material';

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default function AvatarUploader ({ currentAvatar }) {
    const [ preview, setPreview ] = useState(currentAvatar || '');
    const [ uploading, setUploading ] = useState(false);

    const handleFileChange = async(e) => {
        const file = e.target.file[0];
        if(!file) { 
            return;
        }
        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            setPreview(url);
            // Save to DB
            await Axios.put(BACKEND_URL+"/user/update", { avatar: url }, {withCredentials: true });

        } catch (error) {
            console.error("Avatar Upload Failed: ", error);
        } finally {
            setUploading(false);
        }
    };

    return(
        <Box textAlign={"center"} my={2}>
            <Avatar src={preview} sx={{ width: 100, height: 100, mx: "auto", mb: 2,  }}/>
            <Button variant="contained" component="label" disabled={uploading} >
                {uploading ? <CircularProgress size={25}/> : "Upload Avatar" }
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
        </Box>
    );
}