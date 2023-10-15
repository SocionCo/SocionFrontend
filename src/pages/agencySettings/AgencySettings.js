import { Box, Grid, Paper, Typography } from "@mui/material";
import SocionHeader from "../../components/headers/SocionHeader";
import Sidebar from "../../components/navigation/Sidebar";
import InfluencerSidebar from "../../components/navigation/InfluencerSidebar";
import AgencySettingsSidebar from "./agencySettingsComponents/AgencySettingsSidebar";
import StringAvatar from "../../components/avatar/StringAvatar";

export default function AgencySettings() {
    const userType = localStorage.getItem('user-type');
    return (
        <Box sx={{ m: 2 }} >
            <SocionHeader showButton={false} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    {userType === "Admin" || userType === "TalentManager" ?
                        <Sidebar index={4} /> :
                        <InfluencerSidebar index={4} />
                    }
                </Grid>
                <Grid item xs={12} md={2}>
                    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant='h6'>Account Settings</Typography>
                        <AgencySettingsSidebar active={0}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                        <Typography variant='h6' gutterBottom>My Profile</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StringAvatar
                                name={"Demo Name"}
                                size={100}
                            />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant='h6'>Daniel Biundo</Typography>
                                <Typography variant='body2'>Talent Manager</Typography>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>Personal Information</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{marginBottom: 1}}>
                                   <Typography variant='subtitle1' color='textSecondary'>First Name</Typography>
                                   <Typography variant='body1'>Daniel</Typography>
                                </Box>
                                <Box sx={{marginBottom: 1}}>
                                   <Typography variant='subtitle1' color='textSecondary'>Last Name</Typography>
                                   <Typography variant='body1'>Biundo</Typography>
                                </Box>
                                <Box sx={{marginBottom: 1}}>
                                   <Typography variant='subtitle1' color='textSecondary'>Email</Typography>
                                   <Typography variant='body1'>dbiundo09@gmail.com</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{marginBottom: 1}}>
                                   <Typography variant='subtitle1' color='textSecondary'>Phone</Typography>
                                   <Typography variant='body1'>508-202-2059</Typography>
                                </Box>
                                <Box sx={{marginBottom: 1}}>
                                   <Typography variant='subtitle1' color='textSecondary'>Role</Typography>
                                   <Typography variant='body1'>Talent Manager</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

