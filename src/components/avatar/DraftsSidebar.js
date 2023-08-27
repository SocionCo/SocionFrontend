import { Badge, Box, Button, Link, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import StringAvatar from '../avatar/StringAvatar';
import InfluencerDraftReviewModal from '../modals/InfluencerDraftReviewModal';
import React from 'react';


const DraftList = ({ contract, dashboardOpen }) => {
    const { drafts } = contract;
    console.log("drafts", drafts);

    const [open, setOpen] = React.useState(false);
    const [draft, setDraft] = React.useState(null);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {draft && (
                <InfluencerDraftReviewModal
                    open={open}
                    handleClose={handleClose}
                    draft={draft}
                />)}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box>
                    <List>

                        {drafts.map(draft => {
                            return (<ListItem key={draft.id}>
                                <ListItemAvatar>
                                    <StringAvatar
                                        name={draft.fullName}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={draft.draftName}
                                    secondaryTypographyProps={{ component: 'div' }}
                                    secondary={
                                        <>
                                            <Typography variant='body2'>{"Submitted By: " + draft.fullName}</Typography>
                                            <Typography variant='body2'>{"Status: " + draft.approvalStatus}</Typography>
                                        </>
                                    }
                                />
                            </ListItem>);
                        })}



                    </List>
                </Box>
                <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Badge badgeContent={drafts.filter((draft) => {return draft.approvalStatus === "UNREVIEWED"}).length} color="error" sx={{ maxWidth: "max-content", p:0, m:0 }}>
                        <Button 
                        variant='contained'
                            onClick={dashboardOpen}
                            color='grey'
                            >Dashboard</Button>
                    </Badge>
                </Box>
            </Box>
        </>
    );
}

const DraftsSidebar = ({ contract, dashboardOpen }) => {
    return (
        <Box sx={{
            width: '100%',
            height: '100%'
        }}>
            <DraftList contract={contract} dashboardOpen={dashboardOpen}></DraftList>
        </Box>
    );
}


export default DraftsSidebar;