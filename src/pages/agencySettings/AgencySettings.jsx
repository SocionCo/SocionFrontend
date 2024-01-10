import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import SocionHeader from "../../components/headers/SocionHeader";
import Sidebar from "../../components/navigation/Sidebar";
import InfluencerSidebar from "../../components/navigation/InfluencerSidebar";
import AgencySettingsSidebar from "./agencySettingsComponents/AgencySettingsSidebar";
import StringAvatar from "../../components/avatar/StringAvatar";
import FullSettingsSidebar from "./agencySettingsComponents/FullSettingsSidebar";
import React, { useEffect, useState } from "react";
import { getUserDetails, updateInfluencerSettings } from "../../services/userServices";
import { useFormik } from "formik";

export default function AgencySettings() {
    const [userDetails, setUserDetails] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [refresh, setRefresh] = useState(false);


    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    const userType = localStorage.getItem('user-type');


    useEffect(() => {
        const hitApi = async () => {
            try {
                const response = await getUserDetails();
                setUserDetails(response.data);
                console.log("Setting user details to", response.data);
            } catch (error) {
                console.log(error);
            }
        };

        hitApi();
    }, [refresh]);

    useEffect(() => {
        resetFormValues();
    }, [userDetails]);

    const myForm = useFormik({
        initialValues: {
            instagramUsername: userDetails ? userDetails.instagramUsername : "",
            youtubeUsername: userDetails ? userDetails.youtubeUsername : "",
            tiktokUsername: userDetails ? userDetails.tiktokUsername : "",
            facebookUsername: userDetails ? userDetails.facebookUsername : "",

        },
        validateOnChange: true,
        validateOnBlur: true,

        onSubmit: async (values) => {
            const influencerDTO = {
                email: userDetails.email,
                instagramUsername: values.instagramUsername,
                youtubeUsername: values.youtubeUsername,
                tiktokUsername: values.tiktokUsername,
                facebookUsername: values.facebookUsername
            }




            const response = await updateInfluencerSettings(influencerDTO);
            handleRefresh();
            setEditMode(false);


        }
    });

    const resetFormValues = () => {
        console.log("Reseting form details to: ", userDetails);
            myForm.setValues({
                instagramUsername: userDetails ? userDetails.instagramUsername || "" : "",
                youtubeUsername: userDetails ? userDetails.youtubeUsername || "" : "",
                tiktokUsername: userDetails ? userDetails.tiktokUsername || "": "",
                facebookUsername: userDetails ? userDetails.facebookUsername || "" : "",
            });
    }

    if (!userDetails) {
        return (<CircularProgress />)
    }

    return (
        <FullSettingsSidebar
            currentIndex={0}
            mainPage={
                <React.Fragment>
                    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                        <Typography variant='h6' gutterBottom>My Profile</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StringAvatar
                                name={"Demo Name"}
                                size={100}
                            />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant='h6'>{userDetails.fullName}</Typography>
                                <Typography variant='body2'>{userType}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                        <Typography variant='h6' gutterBottom>Personal Information</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ marginBottom: 1 }}>
                                    <Typography variant='subtitle1' color='textSecondary'>First Name</Typography>
                                    <Typography variant='body1'>{userDetails.firstName}</Typography>
                                </Box>
                                <Box sx={{ marginBottom: 1 }}>
                                    <Typography variant='subtitle1' color='textSecondary'>Last Name</Typography>
                                    <Typography variant='body1'>{userDetails.lastName}</Typography>
                                </Box>
                                <Box sx={{ marginBottom: 1 }}>
                                    <Typography variant='subtitle1' color='textSecondary'>Email</Typography>
                                    <Typography variant='body1'>{userDetails.email}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ marginBottom: 1 }}>
                                    <Typography variant='subtitle1' color='textSecondary'>Role</Typography>
                                    <Typography variant='body1'>{userType}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>



                    {userType === "Influencer" && (

                        <Paper elevation={2} sx={{ p: 2 }}>
                            <Typography variant='h6' gutterBottom>Social Media</Typography>
                            <Grid container spacing={2}>

                                {!editMode ? (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <Typography variant='subtitle1' color='textSecondary'>Instagram Username</Typography>
                                                <Typography variant='body1'>{(myForm.values.instagramUsername !== "" && myForm.values.instagramUsername !== null) ? myForm.values.instagramUsername : "Not Set"}</Typography>
                                            </Box>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <Typography variant='subtitle1' color='textSecondary'>TikTok Username</Typography>
                                                <Typography variant='body1'>{(myForm.values.tiktokUsername !== "" && myForm.values.tiktokUsername !== null) ? myForm.values.tiktokUsername : "Not Set"}</Typography>
                                            </Box>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <Typography variant='subtitle1' color='textSecondary'>Youtube Username</Typography>
                                                <Typography variant='body1'>{(myForm.values.youtubeUsername !== "" && myForm.values.youtubeUsername !== null) ? myForm.values.youtubeUsername : "Not Set"}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <Typography variant='subtitle1' color='textSecondary'>Facebook Username</Typography>
                                                <Typography variant='body1'>{(myForm.values.facebookUsername !== "" && myForm.values.facebookUsername !== null) ? myForm.values.facebookUsername : "Not Set"}</Typography>
                                            </Box>
                                        </Grid>
                                    </>)

                                    :

                                    (<>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <TextField
                                                    margin="dense"
                                                    name="instagramUsername"
                                                    label="Instagram Username"
                                                    value={myForm.values.instagramUsername}
                                                    onChange={myForm.handleChange}
                                                    error={!!myForm.errors.instagramUsername}
                                                    helperText={myForm.errors.instagramUsername}
                                                    sx={{
                                                        marginBottom: 1,
                                                        width: '100%',
                                                        m: 1
                                                    }}
                                                    disabled={!editMode}
                                                />
                                            </Box>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <TextField
                                                    margin="dense"
                                                    name="tiktokUsername"
                                                    label="TikTok Username"
                                                    value={myForm.values.tiktokUsername}
                                                    onChange={myForm.handleChange}
                                                    error={!!myForm.errors.tiktokUsername}
                                                    helperText={myForm.errors.tiktokUsername}
                                                    sx={{
                                                        marginBottom: 1,
                                                        width: '100%',
                                                        m: 1
                                                    }}
                                                    disabled={!editMode}
                                                />
                                            </Box>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <TextField
                                                    margin="dense"
                                                    name="youtubeUsername"
                                                    label="YouTube Username"
                                                    value={myForm.values.youtubeUsername}
                                                    onChange={myForm.handleChange}
                                                    error={!!myForm.errors.youtubeUsername}
                                                    helperText={myForm.errors.youtubeUsername}
                                                    sx={{
                                                        marginBottom: 1,
                                                        width: '100%',
                                                        m: 1
                                                    }}
                                                    disabled={!editMode}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <TextField
                                                    margin="dense"
                                                    name="facebookUsername"
                                                    label="Facebook Username"
                                                    value={myForm.values.facebookUsername}
                                                    onChange={myForm.handleChange}
                                                    error={!!myForm.errors.facebookUsername}
                                                    helperText={myForm.errors.facebookUsername}
                                                    sx={{
                                                        marginBottom: 1,
                                                        width: '100%',
                                                        m: 1
                                                    }}
                                                    disabled={!editMode}
                                                />
                                            </Box>
                                        </Grid>


                                    </>)

                                }


                                <Box sx={{ width: '100%', marginBottom: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box sx={{ m: 1 }}>
                                        <Button variant={!editMode ? "contained" : 'outlined'}
                                            onClick={() => setEditMode(!editMode)}
                                        >{!editMode ? "Edit" : "Cancel"}</Button>
                                    </Box>
                                    {editMode && (
                                        <Box sx={{ m: 1 }}>
                                            <Button
                                                sx={{}}
                                                color='success'
                                                variant="contained"
                                                onClick={myForm.handleSubmit}
                                            >Save</Button>
                                        </Box>

                                    )}
                                </Box>



                            </Grid>
                        </Paper>)}




                </React.Fragment>
            }

        />
    );
}