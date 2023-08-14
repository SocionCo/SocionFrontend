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
        confirmPassword: Yup.string().required("Confirm password is required")
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>

                <Typography component='h6' variant="h6" >Register</Typography>
                <Typography component='h6' variant="caption" >Are you an influencer? Reach out to a manager at your agency to recieve an invite.</Typography>
            </Box>
            <TextField
                required
                label="First Name"
                margin="dense"
                name="firstName"
                value={myForm.values.firstName}
                onChange={myForm.handleChange}
                error={!!myForm.errors.firstName}
                helperText={myForm.errors.firstName}
            />


            <TextField
                required
                label="Last Name"
                margin="dense"
                name="lastName"
                value={myForm.values.lastName}
                onChange={myForm.handleChange}
                error={!!myForm.errors.lastName}
                helperText={myForm.errors.lastName}
            />

            <TextField
                required
                label="Email"
                margin="dense"
                name="email"
                value={myForm.values.email}
                onChange={myForm.handleChange}
                error={!!myForm.errors.email}
                helperText={myForm.errors.email}
            />

            <TextField
                required
                label="Agency Name"
                margin="dense"
                name="agencyName"
                value={myForm.values.agencyName}
                onChange={myForm.handleChange}
                error={!!myForm.errors.agencyName}
                helperText={myForm.errors.agencyName}
            />

            <TextField
                required
                label="Password"
                type="password"
                margin="dense"
                name="password"
                value={myForm.values.password}
                onChange={myForm.handleChange}
                error={!!myForm.errors.password}
                helperText={myForm.errors.password}
            />

            <TextField
                required
                label="Confirm Password"
                margin="dense"
                name="confirmPassword"
                type="password"
                value={myForm.values.confirmPassword}
                onChange={myForm.handleChange}
                error={!!myForm.errors.confirmPassword}
                helperText={myForm.errors.confirmPassword}
                sx={{
                    marginBottom: 1
                }}
            />



            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>


                {error && (<Typography component='h6' variant="caption" >Error submitting the form. Make sure user email is not already in use.</Typography>)}
                <Button
                    disabled={!myForm.isValid || !isFormValid}
                    onClick={myForm.submitForm}
                    variant="contained"
                >
                    Create Agency
                </Button>
            </Box>

        </Box>
    );
}
