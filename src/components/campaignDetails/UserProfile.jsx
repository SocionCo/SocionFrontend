import { Box, Button, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { removeInfluencersFromContract } from '../../services/campaignServices';
import StringAvatar from '../avatar/StringAvatar';
import AddInfluencerModal from '../modals/AddInfluencerModal';
import ConfirmActionDialogue from '../modals/ConfirmActionDialogue';
import InfluencerDetailsModal from '../modals/InfluencerDetailsModal';
import InviteInfluencerModal from '../modals/InviteInfluencerModal';

const label = "Are you sure you want to remove this talent?";

const description = "This action is not reversible.";



const UserProfile = ({ contract }) => {


    const { influencers, id } = contract;
    const [open, setOpen] = useState(false);
    const [deleteInfluencerDialogue, setDeleteInfluencerDialogue] = useState(false);
    const [selectedInfluencer, setSelectedInfluencer] = useState(null);
    const [detailViewOpen, setDetailViewOpen] = useState(false);
    const [detailViewInfluencer, setDetailViewInflunecer] = useState(null);
    const [inviteTalentOpen, setInviteTalentOpen] = useState(false);


    const handleInviteTalentClose = () => { 
        setInviteTalentOpen(false);
    }

    const handleDetailViewClose = () => {
        setDetailViewOpen(false);
    }

    const handleDetailViewOpen = (influencer) => {
        setDetailViewInflunecer(influencer);
        setDetailViewOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDialogueOpen = (influencer) => {
        setSelectedInfluencer(influencer);
        setDeleteInfluencerDialogue(true);
    }

    const handleDialogueClose = () => {
        setSelectedInfluencer(null);
        setDeleteInfluencerDialogue(false);
    }

    const onClick = () => {
        removeInfluencersFromContract([selectedInfluencer], contract.id);
        window.location.reload();
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {detailViewInfluencer &&
                (<InfluencerDetailsModal
                    open={detailViewOpen}
                    handleClose={handleDetailViewClose}
                    user={detailViewInfluencer}
                />)
            }
            <InviteInfluencerModal 
            open={inviteTalentOpen} 
            handleClose={handleInviteTalentClose}
            contractId={id}
            >

            
            </InviteInfluencerModal>
            <ConfirmActionDialogue
                open={deleteInfluencerDialogue}
                handleClose={handleDialogueClose}
                onClick={onClick}
                setOpen={handleDialogueOpen}
                label={label}
                description={description}
            />
            <AddInfluencerModal open={open} handleClose={handleClose} existingInfluencers={influencers} contractId={contract.id}></AddInfluencerModal>
            <Box>
                <List>

                    {influencers.map(influencer => {

                        return (<ListItem key={influencer.email}>
                            <ListItemAvatar>
                                <StringAvatar name={influencer.fullName} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={influencer.fullName}
                                secondaryTypographyProps={{ component: 'div' }}
                                secondary={
                                    <Stack direction='row'>
                                        <Link
                                            component="button" // Added this
                                            onClick={() => handleDialogueOpen(influencer)}
                                            style={{ textDecoration: 'none', color: 'inherit' }} // Styling
                                        >
                                            Remove
                                        </Link>
                                        <Typography variant='body2' sx={{ paddingX: .5 }}>|</Typography>
                                        <Link
                                            component="button" // Added this
                                            onClick={() => handleDetailViewOpen(influencer)}
                                            style={{ textDecoration: 'none', color: 'inherit' }} // Styling
                                        >
                                            Edit
                                        </Link>
                                    </Stack>
                                }
                            />
                        </ListItem>);
                    })}



                </List>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained'
                    sx={{
                        color: 'grey',
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        marginRight: 1.5
                    }}
                    onClick={() => setOpen(true)}
                >Manage Talent</Button>
                <Button
                    variant='contained'
                    sx={{
                        color: 'grey',
                        backgroundColor: 'white',
                        alignSelf: 'center'
                    }}
                    onClick={() => setInviteTalentOpen(true)}
                >Invite Talent</Button>

            </Box>
        </Box>
    );
}

export default UserProfile;