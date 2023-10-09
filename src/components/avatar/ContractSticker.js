import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";

import StringAvatar from "./StringAvatar";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteContractWithId } from "../../services/campaignServices";
import ConfirmActionDialogue from "../modals/ConfirmActionDialogue";
import CampaignIcon from '@mui/icons-material/Campaign';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import { timeAgo } from "../../util/conversionUtil";

const ContractSticker = ({ contract, sx, refresh }) => {
    const { influencers, name } = contract;
    const [open, setOpen] = useState(false);
    const [randomColor, setRandomColor] = useState("");

    const userType = localStorage.getItem('user-type');

    const trimmedName = name.length > 20 ? name.substring(0, 15) + "..." : name;

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }



    useEffect(() => {
        if (!randomColor) {
            setRandomColor(getRandomColor());
        }
    }, [randomColor]);

    return (
        <Paper sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            paddingLeft: 5,
            backgroundColor: '#FAFAFA',
            height: '15vh',
            width: '100%',
            position: 'relative',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #EAEAEA'
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
                alignItems: 'center'
            }}>
                <CampaignIcon sx={{
                    color: randomColor,
                    backgroundColor: `${randomColor}20`,
                    borderRadius: '25%',
                    padding: '0.5rem',
                    fontSize: '2rem'
                }} />
                <Stack sx={{ paddingLeft: '1.5rem', alignItems: 'flex-start' }}>
                    <Typography align="left" variant='h6' component='h6' sx={{
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'none'
                    }}>{trimmedName}</Typography>
                    {
                        (influencers.length === 0) ?
                            '' :
                            (influencers.length === 1) ?
                                (
                                    <Typography sx={{
                                        textTransform: 'none'
                                    }} variant='body1' component='p' key={influencers[0].email}>{influencers[0].fullName}</Typography>
                                ) :

                                (
                                    <Typography sx={{
                                        textTransform: 'none'
                                    }} variant='body1' component='p' key={influencers[0].email}>{influencers[0].fullName} and {influencers.length} others</Typography>
                                )
                    }
                    <Typography variant='caption' component='caption' sx={{
                        textTransform: 'none'
                    }}>{timeAgo(contract.creationDate)} </Typography>
                </Stack>
            </Box>
        </Paper>
    );
}

export default ContractSticker;
