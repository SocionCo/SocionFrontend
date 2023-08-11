import { Box, Paper, Stack, Typography } from "@mui/material";
import StringAvatar from "./StringAvatar";

const EmployeeSticker = ({ influencer }) => {
    const { email, fullName } = influencer;

    return (
        <Paper sx={{ backgroundColor: 'lightGrey', margin: 0, width: "100%" }}>
            <Box sx={{ p: '2rem', m: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <StringAvatar name={fullName} />
                <Stack sx={{ paddingLeft: '1rem' }}>
                    <Typography variant='body1' component='h6'>{fullName}</Typography>
                    <Typography variant='caption' component='p'>{email}</Typography>
                </Stack>
            </Box>
        </Paper>
    );
}

export default EmployeeSticker;