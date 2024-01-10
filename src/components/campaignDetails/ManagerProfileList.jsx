import { Box, Button, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { removeInfluencersFromContract } from '../../services/campaignServices';
import StringAvatar from '../avatar/StringAvatar';
import AddInfluencerModal from '../modals/AddInfluencerModal';
import ConfirmActionDialogue from '../modals/ConfirmActionDialogue';
import InfluencerDetailsModal from '../modals/InfluencerDetailsModal';
import AddTalentManagerModal from '../modals/AddTalentManagerModal';


const description = "This action is not reversible.";



const ManagerProfileList = ({ contract }) => {


    console.log("Checking for talent managers now", contract);

    const { talentManagers } = contract;

    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AddTalentManagerModal open={open} handleClose={handleClose} currentTalentManagers={talentManagers} contractId={contract.id}/>
            <Box>
                <List>

                    {talentManagers.map(talentManager => {

                        return (<ListItem key={talentManager.email}>
                            <ListItemAvatar>
                                <StringAvatar name={talentManager.fullName} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={talentManager.fullName}
                                secondary={
                                    <Typography variant='caption' >{talentManager.email}</Typography>
                                }
                                secondaryTypographyProps={{ component: 'div' }}
                                
                            />
                        </ListItem>);
                    })}



                </List>
            </Box>
            {/* <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant='contained'
                    sx={{
                        color: 'grey',
                        backgroundColor: 'white',
                        alignSelf: 'center',
                    }}
                    
                    onClick={() => setOpen(true)}
                >Manage Team</Button>
            </Box> */}
        </Box>
    );
}

export default ManagerProfileList;