import { Box, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import StringAvatar from '../avatar/StringAvatar';


const DraftList = ({ contract, dashboardOpen }) => {
    const { drafts } = contract;
    console.log("drafts", drafts);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box>
                <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: .5, paddingTop: 1 }}>
                    Drafts
                </Typography>
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
                                        <Typography variant='body2'>{"Status: " +draft.approvalStatus}</Typography>
                                    </>
                                }
                            />
                        </ListItem>);
                    })}



                </List>
            </Box>
            <Button variant='contained'
                onClick={dashboardOpen}
                sx={{
                    color: 'grey',
                    backgroundColor: 'white',
                    width: '50%',
                    alignSelf: 'center',
                    borderRadius: 25,
                    m: 1,
                }}>Dashboard</Button>
        </Box>
    );
}

const DraftsSidebar = ({ contract, dashboardOpen }) => {
    return (
        <Paper sx={{
            width: '100%',
            height: '100%'
        }}>
            <DraftList contract={contract} dashboardOpen={dashboardOpen}></DraftList>
        </Paper>
    );
}


export default DraftsSidebar;