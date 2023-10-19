import { Box, Grid, Paper, Typography } from "@mui/material";
import FullSettingsSidebar from "./agencySettingsComponents/FullSettingsSidebar"

export default function AdminSettings() {
    return (
        <FullSettingsSidebar
            currentIndex={2}
            mainPage={
                <>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>Agency Settings</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ marginBottom: 1 }}>
                                    <Typography variant='subtitle1' color='textSecondary'>Email</Typography>
                                    <Typography variant='body1'>dbiundo09@gmail.com</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </>


            }
        />

    );
}