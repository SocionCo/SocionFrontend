import { Box, Button, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { removeInfluencersFromContract } from '../../services/campaignServices';
import StringAvatar from '../avatar/StringAvatar';
import AddInfluencerModal from '../modals/AddInfluencerModal';
import ConfirmActionDialogue from '../modals/ConfirmActionDialogue';
import InfluencerDetailsModal from '../modals/InfluencerDetailsModal';

const label = "Label";

const description = "Description";

const ProfileAndText = ({ contract }) => {

    
    const { influencers } = contract;
    const [open, setOpen] = useState(false);
    const [deleteInfluencerDialogue, setDeleteInfluencerDialogue] = useState(false);
    const [selectedInfluencer, setSelectedInfluencer] = useState(null);
    const [detailViewOpen, setDetailViewOpen] = useState(false);
    const [detailViewInfluencer, setDetailViewInflunecer] = useState(null);

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
                <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: .5, paddingTop: 1 }}>
                    Influencers
                </Typography>
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
            <Button variant='contained' sx={{
                color: 'grey',
                backgroundColor: 'white',
                width: '50%',
                alignSelf: 'center',
                borderRadius: 25,
                m: 1,
            }}
                onClick={() => setOpen(true)}
            >Manage Talent</Button>
        </Box>
    );
}

const UserProfile = ({ contract }) => {
    return (
        <Paper sx={{
            backgroundColor: 'lightGrey',
            width: '100%',
            height: '100%'
        }}>
            <ProfileAndText contract={contract}></ProfileAndText>
        </Paper>
    );
}


export default UserProfile;