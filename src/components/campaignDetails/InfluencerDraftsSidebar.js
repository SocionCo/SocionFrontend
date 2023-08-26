import { Box, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import StringAvatar from '../avatar/StringAvatar';

const InfluencerDraftsSidebar = ({ contract, dashboardOpen }) => {
    const { drafts } = contract;

    return (
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
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant='contained'

                    onClick={dashboardOpen}
                    sx={{
                        color: 'grey',
                        backgroundColor: 'white',
                        alignSelf: 'center',
                    }}>Add Draft</Button>
            </Box>
        </Box>
    );
}


export default InfluencerDraftsSidebar;