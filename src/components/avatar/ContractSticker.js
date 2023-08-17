import { Box, Paper, Stack, Typography } from "@mui/material";
import StringAvatar from "./StringAvatar";

const ContractSticker = ({ contract, sx }) => {
    const { influencers, name } = contract;

    const trimmedName = name.length > 20 ? name.substring(0, 15) + "..." : name;

    return (
            <Paper sx={{ backgroundColor: 'lightGrey'}}>
                <Box sx={{ p: '2rem', m: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <StringAvatar name={name} />
                    <Stack sx={{ paddingLeft: '1rem' }}>
                        <Typography variant='body1' component='h6' sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{trimmedName} </Typography>
                        {
                            influencers.map(influencer => {
                                return (
                                    <Typography variant='caption' component='p' key={influencer.email}>{influencer.fullName}</Typography>
                                );
                            })
                        }
                    </Stack>
                </Box>
            </Paper>
    );
}

export default ContractSticker;