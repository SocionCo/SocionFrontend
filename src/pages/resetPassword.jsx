import React, { useState } from 'react';

import axios from 'axios';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { resetPassword } from '../services/userServices';
import { Navigate, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();


    const handleReset = async () => {
        setDialogOpen(true);
        const response = await resetPassword(email);

    };

    const handleCloseOfDialog = async () => {
        setDialogOpen(false)
        navigate("/login");
    }

    return (
        <><Dialog
            open={dialogOpen}
            onClose={handleCloseOfDialog}
        >
            <DialogTitle>Reset Successful</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please check your email for further instructions.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseOfDialog} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
            <Container component="main" maxWidth="xs">

                <Typography variant="h5">
                    Reset Password
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleReset}
                >
                    Submit
                </Button>
            </Container>
        </>
    );
};

export default ResetPassword;
