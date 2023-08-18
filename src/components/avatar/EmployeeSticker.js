import { Box, Paper, Stack, Typography } from "@mui/material";
import StringAvatar from "./StringAvatar";

const EmployeeSticker = ({ influencer }) => {
    const { email, fullName } = influencer;

    return (
            <Paper sx={{backgroundColor: 'lightGrey', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh', width: '100%' }}>
                <StringAvatar name={fullName} />
                <Stack sx={{ paddingLeft: '1rem' }}>
                    <Typography variant='body1' component='h6'>{fullName}</Typography>
                    <Typography variant='caption' component='p'>{email}</Typography>
                </Stack>
            </Paper>
    );
}

export default EmployeeSticker;