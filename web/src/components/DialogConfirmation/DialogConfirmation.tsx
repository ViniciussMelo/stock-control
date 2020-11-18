import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';
import { ConfirmationEnum } from "./ConfirmationEnum";

interface DialogConfirmationProps {
    open: boolean;
    handleClose(action: ConfirmationEnum): void;
    message: string;
}

const DialogConfirmation: React.FC<DialogConfirmationProps> = ({ open, handleClose, message }) => {
    const handleCloseDialog = (actionClicked: ConfirmationEnum) => {
        handleClose(actionClicked);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {handleCloseDialog(ConfirmationEnum.Disagree)}} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {handleCloseDialog(ConfirmationEnum.Agree)}} color="primary" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogConfirmation;