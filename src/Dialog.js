import React from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';

export default function DialogComponent({ open, handleDialogClose, removeMultipleItems, completeMultipleItems, dialogName }) {
    //TODO : Pass the title of the todo items to show in the dialog content before deleting.

    const handleAffirmation = () => {
        if (dialogName === 'complete') {
            completeMultipleItems()
        } else {
            removeMultipleItems();
        }
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleDialogClose}
            >
                <DialogTitle>{`${dialogName.toUpperCase()} Task`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to {`${dialogName}`} the selected items?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} variant="contained">
                        No
                    </Button>
                    <Button
                        onClick={handleAffirmation}
                        variant="contained" color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}