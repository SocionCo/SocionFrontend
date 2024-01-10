import { Box, Paper, Stack, Typography } from "@mui/material";
import StringAvatar from "./StringAvatar";

const EmployeeSticker = ({ influencer }) => {
    const { email, fullName } = influencer;

    return (
        <Paper sx={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 5,
            backgroundColor: '#FAFAFA',
            height: '15vh',
            width: '100%',
            position: 'relative',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #EAEAEA'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                    <StringAvatar name={fullName} />
                    <Stack sx={{ paddingLeft: '1.5rem', alignItems: 'flex-start' }}>
                        <Typography align="left" variant='h6' component='h6' sx={{
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'none'
                        }}>{fullName}</Typography>
                        <Typography variant='caption' component='p'>{email}</Typography>
                    </Stack>
                </Box>
            </Box>
        </Paper>
    );
}

export default EmployeeSticker;
