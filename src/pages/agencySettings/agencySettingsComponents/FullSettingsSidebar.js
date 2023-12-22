import { Box, Grid, Paper, Typography } from "@mui/material";
import SocionHeader from "../../../components/headers/SocionHeader";
import Sidebar from "../../../components/navigation/Sidebar";
import InfluencerSidebar from "../../../components/navigation/InfluencerSidebar";
import AgencySettingsSidebar from "./AgencySettingsSidebar";

export default function FullSettingsSidebar({ mainPage, currentIndex = 0 }) {
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
                        <AgencySettingsSidebar active={currentIndex} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    {mainPage}
                </Grid>
            </Grid>
        </Box>
    );
}

