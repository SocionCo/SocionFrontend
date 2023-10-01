import React, { useState } from 'react';
import { Box, Button, IconButton, Paper, Typography, Menu, MenuItem } from "@mui/material";
import Chip from '@mui/material/Chip';
import { formatDate } from "../../util/dateUtil";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ConfirmActionDialogue from '../modals/ConfirmActionDialogue';
import { deleteContractWithId, markContractAsComplete, markContractAsIncomplete } from '../../services/campaignServices';
import { useNavigate } from 'react-router-dom';

const CampaignSummary = ({ contract, refresh }) => {
    const { name, creationDate, completed } = contract;
    const stringDate = formatDate(creationDate);
    const [confirmationOpen, setConfirmationOpen] = React.useState(false);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleCampaignDelete = () => {
        setConfirmationOpen(true);
        handleCloseMenu();

    }

    const deleteCampaign = async () => {
        await deleteContractWithId(contract.id);
        navigate("/home");
    }

    const handleCompleteCampaing = async () => {
        const response = await markContractAsComplete(contract);
        refresh();
    }

    const handleIncompleteCampaign = async () => {
        const response = await markContractAsIncomplete(contract);
        refresh();
    }
    return (
        <Paper sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderBottom: '1px solid #ccc'
        }}>
            <ConfirmActionDialogue
                open={confirmationOpen}
                setOpen={() => setConfirmationOpen(true)}
                onClick={deleteCampaign}
                label="Are you sure you want to delete this campaign?"
                description="This action is not reversible."
                handleClose={() => {setConfirmationOpen(false);}}
            />
            <Box sx={{ paddingLeft: 2 }}>
                <Typography component='h4' variant='h5'>{name}</Typography>

                <Chip label={completed ? "Completed" : "Incomplete"} variant="outlined"
                    sx={{
                        color: completed ? 'green' : 'red',
                        borderColor: completed ? 'green' : 'red',
                        m: 1,
                        marginLeft: 0
                    }}
                />

                <Typography component='p' variant='subtitle2'>{`Created ${stringDate}`}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <Button
                    onClick={completed ? handleIncompleteCampaign : handleCompleteCampaing}
                    color={completed ? "error" : "success"}
                    variant="contained"
                    sx={{ m: 1 }}
                >
                    {completed ? "Mark Incomplete" : "Mark Complete"}
                </Button>

                <IconButton onClick={handleOpenMenu} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
                    <MoreVertIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleCampaignDelete} sx={{ color: 'red' }}>Delete Campaign</MenuItem>
                </Menu>
            </Box>
        </Paper>
    );
}

export default CampaignSummary;
