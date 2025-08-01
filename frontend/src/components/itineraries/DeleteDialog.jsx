import React from "react";
import { TypeAnimation } from 'react-type-animation';
import { Dialog, DialogTitle, DialogContent, LinearProgress, DialogContentText, DialogActions, Button } from '@mui/material';

export default function DeleteDialog ({ open, onCancel, handleDelete }) {

    return (
        <Dialog open={open} onClose={onCancel} disableEscapeKeyDown aria-describedby='itinerary-delete'>
            <DialogTitle color="error" id="itinerary-delete">
                Delete Itinerary
            </DialogTitle>            
            <DialogContent>
                    <DialogContentText>Are you sure you want to delete this itinerary?</DialogContentText> 
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="grey" >Cancel</Button>
                <Button onClick={handleDelete} color="error" variant="contained" >Delete</Button>                
            </DialogActions>
        </Dialog>
    )
}