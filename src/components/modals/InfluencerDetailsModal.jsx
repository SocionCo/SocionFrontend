import { Box, Container, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { getAllActiveAgencyContractsForProvidedUser, getAllCompletedAgencyContractsForProvidedUser, removeInfluencerFromAgency } from '../../services/agencyServices';
import { getTalentManagersForUser } from '../../services/influencerServices';
import StringAvatar from '../avatar/StringAvatar';
import SocionHeader from '../headers/SocionHeader';
import BasicTableNoHeader from '../tables/BasicTableNoHeader';
import SocialTable from '../tables/SocialTable';
import AddTalentManagerModal from './AddTalentManagerModal';
import ConfirmActionDialogue from './ConfirmActionDialogue';
import { useState } from 'react';
import { updateInfluencerSettings } from '../../services/userServices';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const label = "Are you sure you want to remove this user from your agency?"

const description = "This action is irreversible. All campaigns will be deleted."

export default function InfluencerDetailsModal({ open, handleClose, user }) {
    const [activeCampaigns, setActiveCampaigns] = React.useState([]);
    const [completedCampaigns, setCompletedCampaigns] = React.useState([]);
    const [dialogueOpen, setDialogueOpen] = React.useState(false);
    const [formattedTalentManagers, setFormattedTalentManagers] = React.useState([]);
    const [talentManagers, setTalentManagers] = React.useState([]);
    const [addTalentManagerOpen, setAddTalentManagerOpen] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const [refresh, setRefresh] = useState(false);


    const handleRefresh = () => {
        setTimeout(() => {
            setRefresh(!refresh);
        }, 500);
    }

    const handleSetEditMode = () => {
        setEditMode(true);
    }





    const handleOpenAddTalentManager = () => {
        setAddTalentManagerOpen(true);
    }

    const handleCloseAddTalentManager = () => {
        handleRefresh();
        setAddTalentManagerOpen(false);
    }

    const handleDialogueOpen = () => {
        setDialogueOpen(true);
    }

    const handleDialogueClose = () => {
        setDialogueOpen(false);
    }

    const deleteUser = async () => {
        const response = await removeInfluencerFromAgency(user.email);
        window.location.reload();
        setDialogueOpen(false);
    }


    const rows = [
        {
            name: 'Full Name',
            details: user.fullName
        },
        {
            name: 'Email',
            details: user.email
        },
        {
            name: 'Analytics',
            details: user.mediaKit
        },
    ]

    const [otherRows, setOtherRows] = React.useState({
        instagram: user.instagramUsername,
        tiktok: user.tiktokUsername,
        youtube: user.youtubeUsername,
        facebook: user.facebookUsername
    });

    const handleInputChange = (row, newValue) => {
        setOtherRows(prevState => ({
            ...prevState,
            [row]: newValue
        }));
    }

    const handleSave = async () => {
        const influencerDTO = {
            email: user.email,
            instagramUsername: otherRows['instagram'],
            youtubeUsername: otherRows['youtube'],
            tiktokUsername: otherRows['tiktok'],
            facebookUsername: otherRows['facebook']
        }
        const response = await updateInfluencerSettings(influencerDTO);
        setEditMode(false);
    }

    const handleCancel = () => {
        setOtherRows({
            instagram: user.instagramUsername,
            tiktok: user.tiktokUsername,
            youtube: user.youtubeUsername,
            facebook: user.facebookUsername
        })
        setEditMode(false);
    }

    React.useEffect(() => {
        const getTalentManagers = async ({ user }) => {
            const response = await getTalentManagersForUser(user.email, true);
            const formattedTalent = response.map(talentManager => {
                return (
                    { name: talentManager.label }
                );
            })
            setFormattedTalentManagers(formattedTalent);
            setTalentManagers(response);
        }
        getTalentManagers({ user });

    }, [refresh])

    React.useEffect(() => {
        const getContracts = async ({ user }) => {
            const response = await getAllActiveAgencyContractsForProvidedUser(user.email);

            setActiveCampaigns(response);
        }
        getContracts({ user });

    }, [])

    React.useEffect(() => {
        const getContracts = async ({ user }) => {
            const response = await getAllCompletedAgencyContractsForProvidedUser(user.email);
            setCompletedCampaigns(response);
        }
        getContracts({ user });

    }, [])

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            closeAfterTransition
        >

            {addTalentManagerOpen &&
                <AddTalentManagerModal
                    open={addTalentManagerOpen}
                    handleClose={handleCloseAddTalentManager}
                    currentTalentManagers={talentManagers}
                    userEmail={user.email}

                />}
            <ConfirmActionDialogue label={label} description={description} setOpen={handleDialogueOpen} open={dialogueOpen} handleClose={handleDialogueClose} onClick={deleteUser} />
            <SocionHeader showButton={false} showX={true} onX={handleClose} />
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <Paper sx={{ marginX: 3, marginY: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <StringAvatar size={125} name={user.fullName} />
                            <Typography sx={{}} component="h1" variant="h6">{user.fullName}</Typography>
                            <Typography sx={{ m: .25 }} component='h2' variant="caption">Influencer</Typography>
                            <Typography sx={{ m: .25 }} component="h6" variant="caption">{user.email}</Typography>
                            <Stack direction='row'>
                                {!editMode ? (<Button sx={{ m: .5 }}
                                    variant='contained'
                                    onClick={handleSetEditMode}
                                >Edit</Button>) : (
                                    <Button
                                        variant='contained'
                                        sx={{ m: .5 }}
                                        onClick={handleSave}
                                    >Save


                                    </Button>
                                )

                                }
                                {!editMode ? (<Button sx={{ m: .5 }} variant='outlined' onClick={handleDialogueOpen}>Remove</Button>) : (
                                    <Button
                                        sx={{ m: .5 }}
                                        variant='outlined'
                                        onClick={handleCancel}
                                    >Cancel</Button>
                                )

                                }
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
                <Grid xs={8}>
                    <Box sx={{ m: 1 }}>
                        <BasicTableNoHeader rows={rows} influencerEmail={user.email}></BasicTableNoHeader>
                    </Box>
                </Grid>
                <Grid xs={4}>
                    <Box sx={{ marginX: 3, marginY: 1 }}>
                        <SocialTable editMode={editMode} rows={otherRows} handleInputChange={handleInputChange} />
                    </Box>
                </Grid>
                <Grid xs={4} >
                    <Box sx={{ m: 1 }}>
                        <Paper >
                            <Stack sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                                <Typography>Talent Managers</Typography>
                                {formattedTalentManagers.length !== 0 ?
                                    (
                                        <BasicTableNoHeader rows={formattedTalentManagers} />
                                    ) : <Typography sx={{ p: 1, m: 1 }}>Not Managed</Typography>
                                }
                            </Stack>
                        </Paper>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleOpenAddTalentManager}>Manage</Button>
                    </Box>
                </Grid>
                <Grid xs={4}>
                    <Box sx={{ m: 1 }}>
                        <Paper >
                            <Stack sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                                <Typography>Completed Campaigns</Typography>
                                {completedCampaigns.length !== 0 ?
                                    (
                                        <BasicTableNoHeader rows={completedCampaigns} />
                                    ) : <Typography sx={{ p: 1, m: 1 }}>No Campaigns</Typography>
                                }
                            </Stack>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Dialog>
    );
}