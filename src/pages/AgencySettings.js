import { Box, Grid } from "@mui/material";
import SocionHeader from "../components/headers/SocionHeader";
import Sidebar from "../components/navigation/Sidebar";
import InfluencerSidebar from "../components/navigation/InfluencerSidebar";
import AgencySettingsForm from "../components/forms/AgencySettingsForm";

export default function AgencySettings() {

    const userType = localStorage.getItem('user-type');
    return (
        <Box sx={{ m: 1, p: 1 }} >
            <SocionHeader showButton={false}></SocionHeader>
            <Grid container spacing={0}>
                <Grid item xs={12} md={2}>
                    {(userType === "Admin" || userType === "TalentManager") ?
                        (<Sidebar index={4}></Sidebar>) : (<InfluencerSidebar index={4} />)
                    }
                </Grid>
                <Grid item xs={12} md={10}>
                    <Box sx={{ m: 1 }}>
                        <AgencySettingsForm/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )

}