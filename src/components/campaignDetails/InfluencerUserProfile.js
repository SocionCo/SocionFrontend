import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { removeInfluencersFromContract } from '../../services/campaignServices';
import StringAvatar from '../avatar/StringAvatar';
import AddInfluencerModal from '../modals/AddInfluencerModal';
import ConfirmActionDialogue from '../modals/ConfirmActionDialogue';
import InfluencerDetailsModal from '../modals/InfluencerDetailsModal';


const InfluencerUserProfile = ({ contract }) => {


    const { influencers } = contract;
    const [open, setOpen] = useState(false);
    const [selectedInfluencer, setSelectedInfluencer] = useState(null);
    const [detailViewOpen, setDetailViewOpen] = useState(false);
    const [detailViewInfluencer] = useState(null);

    const handleDetailViewClose = () => {
        setDetailViewOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
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
                            />
                        </ListItem>);
                    })}



                </List>
            </Box>
        </Box>
    );
}


export default InfluencerUserProfile;