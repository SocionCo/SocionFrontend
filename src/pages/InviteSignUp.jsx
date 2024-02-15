import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from "formik";
import * as React from 'react';
import * as Yup from "yup";
import { getAgencyIDForInviteToken, registerNewAgencyAndAccount, registerNewInfluencer, registerNewTalentManager } from "../services/agencyServices";
import { useNavigate } from "react-router";
import { Link, useParams, useLocation } from 'react-router-dom';
import { CenterFocusStrong } from "@mui/icons-material";
import { PrivacyPolicyLink, TermsLink } from "../services/apiString";

const InviteSignUp = () => {
    console.log("Entered");
    const { inviteToken } = useParams();
    const [isFormValid, setIsFormValid] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [agencyId, setAgencyId] = React.useState(null);
    const [isTalentManager, setIsTalentManager] = React.useState(false);
    const [inviteUsed, setInviteUsed] = React.useState(false);
    const [apiError, setApiError] = React.useState(false);
    const [acceptedTerms, setAcceptedTerms] = React.useState(false);
    const [regComplete, setRegComplete] = React.useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const campaignId = queryParams.get('redirect');

    console.log("Campaign ID, ", campaignId);

    const navigate = useNavigate();


    const privacyPolicyLink = PrivacyPolicyLink;

    const termsLink = TermsLink;


    const formValidation = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("First Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "must be at least 6 characters"),
        confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const myForm = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {

            const userDTO = {
                firstName: myForm.values.firstName,
                lastName: myForm.values.lastName,
                email: myForm.values.email,
                confirmPassword: myForm.values.confirmPassword,
                password: myForm.values.password
            }

            var response;

            if (isTalentManager) {
                response = await registerNewTalentManager(agencyId, userDTO);
                console.log("GOT TM RESPONSE,", response);
                if (!response.data) {
                    setApiError(true)
                }

            } else {
                response = await registerNewInfluencer(agencyId, userDTO, campaignId);
                if (!response.data) {
                    setApiError(true)
                }
            }

            if (response.data || response.status === 201) {
                setRegComplete(true);
                setTimeout(() => {
                    if (campaignId) {

                        navigate("/login?redirect=" + campaignId);
                    } else {
                        navigate("/login");
                    }
                }, 1000)

            }


        }
    });

    React.useEffect(() => {
        setIsFormValid((myForm.values.password === myForm.values.confirmPassword) && (myForm.values.password !== ""));
    }, [myForm.isValid, myForm.values.ha, myForm.values.confirmPassword]);


    React.useEffect(() => {
        const getAgencyId = async () => {
            const response = await getAgencyIDForInviteToken(inviteToken); setAgencyId(response.agencyId);
            console.log(response);
            console.log("response", response.agencyId);
            myForm.setValues({ ...myForm.values, email: response.email });
            setIsTalentManager(response.talentManagerInvite);
            setInviteUsed(response.inviteUsed);
            setLoading(false);


        }
        getAgencyId();
    }, [])




    if (regComplete) {
        return (
            <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Registration complete, redirecting to login page.</Typography>
            </Box>
        )
    }


    if (inviteUsed) {
        return (
            <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Invite to join is expired or has already been used. Please ask your agency for a new one.</Typography>
            </Box>
        )
    }




    return (
        <Box>
            {loading ? (
                <div>
                    <Typography variant="h6">Loading...</Typography>
                    {/* You can also add a loading indicator here */}
                </div>
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 3
                }}>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}>

                        <Typography component='h6' variant="h6" > {(isTalentManager ? "Register as Talent Manager" : "Register as Influencer")}</Typography>
                    </Box>
                    <TextField
                        required
                        label="First Name"
                        margin="dense"
                        name="firstName"
                        value={myForm.values.firstName}
                        onChange={myForm.handleChange}
                        error={(!!myForm.errors.firstName && myForm.touched.firstName)}
                        helperText={myForm.errors.firstName}
                    />


                    <TextField
                        required
                        label="Last Name"
                        margin="dense"
                        name="lastName"
                        value={myForm.values.lastName}
                        onChange={myForm.handleChange}
                        error={(!!myForm.errors.lastName && myForm.touched.lastName)}
                        helperText={myForm.errors.lastName}
                    />

                    <TextField
                        required
                        label="Email"
                        margin="dense"
                        name="email"
                        value={myForm.values.email}
                        onChange={myForm.handleChange}
                        error={(!!myForm.errors.email && myForm.touched.email)}
                        helperText={myForm.errors.email}
                    />

                    <TextField
                        required
                        label="Password"
                        type="password"
                        margin="dense"
                        name="password"
                        value={myForm.values.password}
                        onChange={myForm.handleChange}
                        error={(!!myForm.errors.password && myForm.touched.password)}
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
                        error={(!!myForm.errors.confirmPassword && myForm.touched.confirmPassword)}
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

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Checkbox
                                style={{ color: 'green' }}
                                value={acceptedTerms}
                                onClick={() => setAcceptedTerms(!acceptedTerms)}

                            />
                            <Typography>By checking this box, I am agreeing to the  <Link to={termsLink} target="_blank">Terms of Service</Link> and <Link to={privacyPolicyLink} target="_blank">Privacy Policy</Link></Typography>

                        </Box>


                        {error && (<Typography component='h6' variant="caption" >Error submitting the form. Make sure user email is not already in use.</Typography>)}
                        {apiError && (
                            <Box>
                                <h4>{"User already exists. Please reset your password if you forgot it, or use a different email."}</h4>
                            </Box>
                        )}
                        <Button
                            disabled={!myForm.isValid || !isFormValid || !acceptedTerms}
                            onClick={myForm.submitForm}
                            variant="contained"
                            sx={{
                                backgroundColor: '#4CAF50', // Green button background
                                color: '#ffffff', // White text
                                '&:hover': {
                                    backgroundColor: '#45a049', // Darker green on hover
                                },
                            }}
                        >
                            Join Agency
                        </Button>

                    </Box>

                </Box>)}
        </Box>
    );

}

export default InviteSignUp;