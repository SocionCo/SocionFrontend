import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Grid, Paper, Toolbar, MenuItem, Select, IconButton, ThemeProvider, createTheme, Typography, List, ListItem, setRef } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ReactPlayer from 'react-player';
import { Stack } from '@mui/system';
import TextField from '@mui/material/TextField/TextField';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import StringAvatar from '../avatar/StringAvatar';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar/ListItemAvatar';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import styled from '@emotion/styled';
import { addCommentToDraft, deleteCommentFromDraft, reviewDraft } from '../../services/draftServices';
import { getContractDetailsWithId } from '../../services/campaignServices';
import DeleteIcon from '@mui/icons-material/Delete';


const timeConvert = (seconds) => {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format as MM:SS
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    return (formattedTime);
};

const SolidBackground = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    borderRadius: 3,
}));

const theme = createTheme({
    palette: {
        primary: {
            main: '#00a152',  // Feel free to use your specific green
        },
        secondary: {
            main: '#ffffff',
        },
    },
});
const CommentSticker = ({ videoPlayer, comment, currentTime, refresh }) => {
    const commenterName = comment.commenter.firstName + " " + comment.commenter.lastName;
    if (!videoPlayer || !videoPlayer.current) { return null; }
    return (
        <ListItem
            selected={Math.abs(currentTime - comment.timeStamp) < 2 && currentTime > 0}
            alignItems="flex-start"
            sx={{
                '&:hover': {
                    backgroundColor: 'rgba(0, 161, 82, 0.1)'
                },
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'

            }}
            onClick={() => videoPlayer.current.seekTo(comment.timeStamp, 'seconds')}
        >


            <ListItemAvatar>
                <StringAvatar name={commenterName} />
            </ListItemAvatar>
            <ListItemText

                primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box>{commenterName}</Box>
                        {comment.timeStamp ? (<Box>{timeConvert(comment.timeStamp)}</Box>) : (<></>)}
                    </Box>

                }
                secondary={comment.comment}
            />
            <IconButton onClick={async (event) => {
                event.stopPropagation();
                await deleteCommentFromDraft(comment.id);
                refresh();
            }}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
}

export default function AdminVideoPlayer({ drafts, handleClose, contractId }) {
    const [activeDraft, setActiveDraft] = React.useState(null);
    const [duration, setDuration] = useState(null);
    const playerRef = useRef(null);
    const [textFieldContains, setTextFieldContains] = useState('');
    const [useTimeStamp, setUseTimeStamp] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [updateDrafts, setUpdatedDrafts] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const response = await getContractDetailsWithId(contractId);
            setUpdatedDrafts(response.drafts);
        };

        fetchData();
    }, []);


    const refresh = async () => {
        const response = await getContractDetailsWithId(contractId);
        for (let index = 0; index < response.drafts.length; index++) {
            if (response.drafts[index].id == activeDraft.id) {
                setActiveDraft(response.drafts[index]);
            }

        }
        setTextFieldContains('');
        setUpdatedDrafts(response.drafts);
    }

    const handleSendComment = async () => {
        if (useTimeStamp) {
            await addCommentToDraft(activeDraft.contractId, activeDraft.id, textFieldContains, currentTime);
        } else {
            await addCommentToDraft(activeDraft.contractId, activeDraft.id, textFieldContains, null);
        }

        refresh();
    }

    const handleUpdateDraftReview = async (event) => {
        console.log("Updated", event.target.value);
        const response = await reviewDraft(activeDraft, event.target.value, "");
        refresh();
    }


    const handleDraftChange = (event) => {
        const selectedDraft = updateDrafts.find(draft => draft.id === event.target.value);
        setActiveDraft(selectedDraft);
    };

    const handleDuration = (d) => {
        console.log("Duration: ", d);
        setDuration(d);
    };

    if (!activeDraft) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Select
                    value={activeDraft ? activeDraft.id : "Select Draft"}
                    variant="outlined"
                    style={{ minWidth: '120px', height: '40px', borderRadius: '4px' }}
                    onChange={handleDraftChange}
                >
                    <MenuItem value="Select Draft" disabled>
                        Select draft
                    </MenuItem>
                    {updateDrafts && (updateDrafts.map((draft) => (
                        <MenuItem key={draft.id} value={draft.id}>
                            {draft.draftName}
                        </MenuItem>
                    )))}
                </Select>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <SolidBackground p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} square style={{ backgroundColor: '#f1f1f1' }}>
                            <Toolbar>
                                <Select
                                    value={activeDraft?.approvalStatus || ''}
                                    variant="outlined"
                                    style={{ minWidth: '120px', height: '40px', borderRadius: '4px' }}
                                    onChange={handleUpdateDraftReview}
                                >
                                    <MenuItem value="UNREVIEWED">Unreviewed</MenuItem>
                                    <MenuItem value="APPROVED">Approved</MenuItem>
                                    <MenuItem value="REJECTED">Rejected</MenuItem>
                                </Select>
                                <div style={{ flexGrow: 1 }} />
                                <Select
                                    value={activeDraft ? activeDraft.id : "Select Draft"}
                                    variant="outlined"
                                    style={{ minWidth: '120px', height: '40px', borderRadius: '4px' }}
                                    onChange={handleDraftChange}
                                >
                                    <MenuItem value="Select Draft" disabled>
                                        Select draft
                                    </MenuItem>
                                    {updateDrafts && (updateDrafts.map((draft) => (
                                        <MenuItem key={draft.id} value={draft.id}>
                                            {draft.draftName}
                                        </MenuItem>
                                    )))}
                                </Select>
                                <div style={{ flexGrow: 1 }} />
                                <IconButton color="primary">
                                    <ShareIcon />
                                </IconButton>
                            </Toolbar>
                        </Paper>

                        {/* Video Player */}
                        <Stack>
                            <Box elevation={3} style={{ padding: 10, backgroundColor: '#e1e1e1' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ReactPlayer
                                        controls
                                        width='100%'
                                        height='100%'
                                        url={activeDraft?.reference}
                                        onDuration={handleDuration}
                                        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
                                        ref={playerRef}
                                        progressInterval={100}

                                    />
                                    {duration && (
                                        <LinearProgress
                                            value={(currentTime / duration) * 100}
                                            sx={{ borderRadius: 2, marginTop: 1, backgroundColor: 'rgba(0, 161, 82, 0.5)' }}
                                            color="secondary"
                                        />
                                    )}
                                </Box>




                                {duration && (
                                    <Box
                                        sx={{
                                            height: '60px',
                                            width: '100%',
                                            position: 'relative',
                                        }}
                                    >
                                        {activeDraft && activeDraft.videoComments && activeDraft.videoComments.length > 0 && (
                                            activeDraft.videoComments.map((comment, index) => {
                                                const position = (comment.timeStamp / duration) * 100;
                                                return (
                                                    <Box
                                                        key={index}
                                                        onClick={() => playerRef.current.seekTo(comment.timeStamp, 'seconds')}
                                                        style={{
                                                            position: 'absolute',
                                                            left: `${position}%`,
                                                            bottom: '10px',
                                                            backgroundColor: 'blue',
                                                            height: '40px',
                                                            width: '40px',
                                                            borderRadius: '50%',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <StringAvatar
                                                            name={comment.commenter.firstName + " " + comment.commenter.lastName}
                                                        ></StringAvatar>
                                                    </Box>
                                                );
                                            })
                                        )}


                                    </Box>)}





                                {duration && (< Stack >
                                    <Box elevation={3} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TextField onChange={(event) => setTextFieldContains(event.target.value)} variant="outlined" value={textFieldContains} sx={{ flexGrow: 10, marginX: 1 }} placeholder="Write a comment..." />
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography sx={{ flexGrow: 1 }}>{timeConvert(playerRef.current.getCurrentTime())}</Typography>
                                            <Checkbox checked={useTimeStamp}
                                                sx={{ flexGrow: 1 }}
                                                onChange={(event) => setUseTimeStamp(event.target.checked)}
                                            />
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <IconButton onClick={handleSendComment}>
                                                <SendIcon />
                                            </IconButton>
                                        </Box>

                                    </Box>
                                </Stack >)}
                            </Box >
                        </Stack >
                    </Grid >


                    <Grid item xs={12} md={4}>
                        <Paper elevation={5} square style={{ backgroundColor: '#e9e9e9', overflow: 'auto', maxHeight: 600 }}>
                            <List sx={{ width: '100%', maxWidth: 400 }}>
                                {
                                    activeDraft && activeDraft.videoComments && activeDraft.videoComments.length === 0 ?
                                        (
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Typography>No Comments Yet!</Typography>
                                            </Box>
                                        )
                                        :
                                        (playerRef && activeDraft && activeDraft.videoComments) && (activeDraft.videoComments.map(element => {
                                            return (
                                                <CommentSticker
                                                    comment={element}
                                                    currentTime={currentTime}
                                                    videoPlayer={playerRef}
                                                    key={element.id}
                                                    refresh={refresh}
                                                />
                                            );
                                        }))
                                }
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </SolidBackground>
        </ThemeProvider >
    );
}


