import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import StringAvatar from "./StringAvatar";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteContractWithId } from "../../services/campaignServices";
import ConfirmActionDialogue from "../modals/ConfirmActionDialogue";
import { useState } from "react";

const ContractSticker = ({ contract, sx, refresh }) => {
    const { influencers, name } = contract;
    const [open, setOpen] = useState(false);

    const userType = localStorage.getItem('user-type');

    const trimmedName = name.length > 20 ? name.substring(0, 15) + "..." : name;

    return (
        <Paper sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'lightGrey',
            height: '15vh',
            width: '100%',
            position: 'relative' // Relative positioning
        }}>
            <ConfirmActionDialogue
                open={open}
                setOpen={() => setOpen(true)}
                onClick={async () => {
                    const response = await deleteContractWithId(contract.id);
                    refresh();
                }}
                label="Are you sure you want to delete this contract?"
                description="This action is not reversible."
                handleClose={(event) => {
                    event?.stopPropagation();
                    setOpen(false);
                }}
            />
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 'auto', // Auto margin
                marginRight: 'auto' // Auto margin
            }}>
                <StringAvatar name={name} />
                <Stack sx={{ paddingLeft: '1rem' }}>
                    <Typography variant='body1' component='h6' sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{trimmedName}</Typography>
                    {
                        influencers.map(influencer => {
                            return (
                                <Typography variant='caption' component='p' key={influencer.email}>{influencer.fullName}</Typography>
                            );
                        })
                    }
                </Stack>
            </Box>
            <Box sx={{
                position: 'absolute', // Absolute positioning
                right: '4%', // Align it to the right
                top: '50%', // Align it vertically center
                transform: 'translateY(-50%)', // Perfectly center it
            }}>
                {
                    (userType === "Admin" || userType === "TalentManager") &&
                    (
                        <Box 
                        sx={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={(event) => {
                            event.stopPropagation();
                            setOpen(true);
                        }}>
                            <DeleteIcon sx={{ color: 'red' }} />
                        </Box>

                    )
                }
            </Box>
        </Paper>
    );
}

export default ContractSticker;
