import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from "formik";
import * as React from 'react';
import * as Yup from "yup";
import { registerNewAgencyAndAccount } from "../../../services/agencyServices";
import { useNavigate } from "react-router";






export default function Register() {

    const [isFormValid, setIsFormValid] = React.useState(false);
    const [error, setError] = React.useState(false);

    const navigate = useNavigate();


    



    const formValidation = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("First Name is required"),
        email: Yup.string().email().required("Email is required"),
        agencyName: Yup.string().required("Agency Name is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const myForm = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            agencyName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const response = await registerNewAgencyAndAccount(values);
            if (response) {
                console.log("Token", response);
                localStorage.clear();
                localStorage.setItem('user-token', response);
                localStorage.setItem('user-type', 'Admin');
                setTimeout(() => {
                    navigate('/home');
                }, 500);
            } else {
                setError(true);
            }


        }
    });


    React.useEffect(() => {
        setIsFormValid((myForm.values.password === myForm.values.confirmPassword) && (myForm.values.password !== ""));
    }, [myForm.isValid, myForm.values.ha, myForm.values.confirmPassword]);




    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff', // White background
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Light shadow
            }}
        >
            <Typography variant="h4" sx={{ color: '#4CAF50', marginBottom: '20px' }}>
                Register
            </Typography>
            <Typography variant="caption" sx={{ color: '#4CAF50', marginBottom: '20px' }}>
                Are you an influencer? Reach out to a manager at your agency to receive an invite.
            </Typography>

            {/* Form Inputs */}
            <TextField
                label="First Name"
                margin="dense"
                name="firstName"
                value={myForm.values.firstName}
                onChange={myForm.handleChange}
                error={!!myForm.errors.firstName}
                helperText={myForm.errors.firstName}
                sx={{width: '50%'}}
            />

            <TextField
                label="Last Name"
                margin="dense"
                name="lastName"
                value={myForm.values.lastName}
                onChange={myForm.handleChange}
                error={!!myForm.errors.lastName}
                helperText={myForm.errors.lastName}
                sx={{width: '50%'}}
            />

            <TextField
                label="Email"
                margin="dense"
                name="email"
                value={myForm.values.email}
                onChange={myForm.handleChange}
                error={!!myForm.errors.email}
                helperText={myForm.errors.email}
                sx={{width: '50%'}}
            />

            <TextField
                label="Agency Name"
                margin="dense"
                name="agencyName"
                value={myForm.values.agencyName}
                onChange={myForm.handleChange}
                error={!!myForm.errors.agencyName}
                helperText={myForm.errors.agencyName}
                sx={{width: '50%'}}
            />

            <TextField
                label="Password"
                type="password"
                margin="dense"
                name="password"
                value={myForm.values.password}
                onChange={myForm.handleChange}
                error={!!myForm.errors.password}
                helperText={myForm.errors.password}
                sx={{width: '50%'}}
            />

            <TextField
                label="Confirm Password"
                margin="dense"
                name="confirmPassword"
                type="password"
                value={myForm.values.confirmPassword}
                onChange={myForm.handleChange}
                error={!!myForm.errors.confirmPassword}
                helperText={myForm.errors.confirmPassword}
                sx={{ width: '50%', marginBottom: '20px' }}
            />

            {/* Form Submission */}
            <Button
                disabled={!myForm.isValid}
                onClick={myForm.handleSubmit}
                variant="contained"
                sx={{
                    backgroundColor: '#4CAF50', // Green button background
                    color: '#ffffff', // White text
                    '&:hover': {
                        backgroundColor: '#45a049', // Darker green on hover
                    },
                }}
            >
                Create Agency
            </Button>

            {/* Error Message */}
            {error && (
                <Typography variant="caption" sx={{ color: 'red', marginTop: '10px' }}>
                    Error submitting the form. Make sure the user email is not already in use.
                </Typography>
            )}
        </Box>
    );
};

