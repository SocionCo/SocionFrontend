import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import FullSettingsSidebar from "./agencySettingsComponents/FullSettingsSidebar";
import StringAvatar from "../../components/avatar/StringAvatar";
import { useNavigate } from "react-router-dom";

export default function Security() {

    const navigate = useNavigate();

    return (
        <FullSettingsSidebar
            currentIndex={1}
            mainPage={
                <>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>Security</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ marginBottom: 1 }}>
                                    <Typography variant='subtitle1' color='textSecondary'>Email</Typography>
                                    <Typography variant='body1'>dbiundo09@gmail.com</Typography>
                                </Box>
                                <Box sx={{ marginBottom: 1 }}>
                                    <Button variant="contained"
                                        onClick={() => navigate("/resetPassword")}
                                    >Reset Password</Button>
                                </Box>

                            </Grid>
                        </Grid>
                    </Paper>
                </>
            }

        />
    )
}