import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Grid, Paper, Toolbar, MenuItem, Select, IconButton, ThemeProvider, createTheme, Typography, List, ListItem, setRef, Slide, CircularProgress } from '@mui/material';
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
import { addCommentToDraft, deleteCommentFromDraft, generateReviewalLinkForDraft, replyToComment, reviewDraft } from '../../services/draftServices';
import { getContractDetailsWithId } from '../../services/campaignServices';
import DeleteIcon from '@mui/icons-material/Delete';
import { timeAgo } from '../../util/conversionUtil';
import CopyIcon from '@mui/icons-material/FileCopy';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Error404 from '../../util/errorPage';


export const timeConvert = (seconds) => {
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

export const theme = createTheme({
    palette: {
        primary: {
            main: '#00a152',  // Feel free to use your specific green
        },
        secondary: {
            main: '#ffffff',
        },
    },
});

export const CommentSticker = ({ contractId, videoPlayer, comment, currentTime, refresh, draftId }) => {
    var commenterName = "";
    if (!comment.commenter) {
        commenterName = comment.brandName + ": " + comment.displayName;
    } else {
        commenterName = comment.displayName;
    }


    const [replyMode, setReplyMode] = React.useState(false);
    const [currentText, setCurrentText] = React.useState('');
    const [showRepliesMode, setShowRepliesMode] = React.useState(false);
    if (!videoPlayer || !videoPlayer.current) { return null; }

    const handleTextFieldChange = (event) => {
        setCurrentText(event.target.value);
    }

    return (
        <Box>
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


                <ListItemAvatar sx={{ m: 0 }}>
                    <StringAvatar name={comment.displayName} />
                </ListItemAvatar>

                <Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemText

                            primary={
                                <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box>{commenterName}</Box>
                                        {comment.timeStamp ? (<Box>{timeConvert(comment.timeStamp)}</Box>) : (<></>)}

                                        {comment.commentedDate && (
                                            <Box>
                                                <Typography variant='caption'>{timeAgo(comment.commentedDate)}</Typography>

                                            </Box>)}
                                    </Box>

                                </>

                            }
                            secondary={
                                <Box>
                                    <Box>
                                        <Typography>{comment.comment}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography onClick={(e) => {
                                                e.stopPropagation();
                                                setShowRepliesMode(false);
                                                setReplyMode(!replyMode);
                                            }} variant='caption'>Reply</Typography>
                                            {(comment.replies && comment.replies.length > 0 && !showRepliesMode) &&
                                                (<Typography
                                                    onClick={() => {
                                                        setReplyMode(false);
                                                        setShowRepliesMode(!showRepliesMode);
                                                    }}
                                                    variant='caption'>{"Show Replies (" + comment.replies.length + ")"}</Typography>

                                                )
                                            }
                                            {(comment.replies && comment.replies.length > 0 && showRepliesMode) &&
                                                (<Typography
                                                    onClick={() => {
                                                        setReplyMode(false);
                                                        setShowRepliesMode(!showRepliesMode);
                                                    }}
                                                    variant='caption'>{"Hide Replies"}</Typography>

                                                )
                                            }
                                        </Box>
                                    </Box>
                                    {replyMode && (

                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TextField
                                                onChange={handleTextFieldChange}
                                                size='small'
                                                sx={{
                                                    width: '80%'
                                                }}
                                            />
                                            <IconButton onClick={async () => {
                                                await replyToComment(contractId, draftId, currentText, null, comment.id);
                                                setReplyMode(false);
                                                setShowRepliesMode(true);
                                                refresh();
                                            }}>
                                                <SendIcon />
                                            </IconButton>
                                        </Box>

                                    )}
                                </Box>

                            }

                        />
                        < IconButton onClick={async (event) => {
                            event.stopPropagation();
                            await deleteCommentFromDraft(comment.id);
                            refresh();
                        }}>
                            <DeleteIcon />
                        </IconButton >
                    </Box>

                </Stack>
            </ListItem >
            {showRepliesMode && (
                <Box sx={{ marginLeft: 4 }}>  {/* Add some margin to indicate these are replies */}
                    {
                        comment.replies.map((element) => {
                            return (
                                <CommentSticker
                                    contractId={contractId}
                                    comment={element}
                                    currentTime={currentTime}
                                    videoPlayer={videoPlayer}
                                    key={element.id}
                                    refresh={refresh}
                                    draftId={draftId}
                                />
                            );
                        })
                    }
                </Box>
            )}
        </Box>
    );
}

export default function VideoPlayer({ isForAdmin = false, contractId }) {
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
                console.log("Peeping data:", response.drafts[index]);

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
                                <ShareButton
                                    draftId={activeDraft.id}
                                    contractId={contractId}
                                />
                            </Toolbar>
                        </Paper>

                        {/* Video Player */}
                        <Stack>
                            <Box elevation={3} style={{ padding: 10, backgroundColor: '#e1e1e1' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ReactPlayer
                                        controls
                                        width='100%'
                                        height='80vh'
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
                                                            name={comment.displayName}
                                                        ></StringAvatar>
                                                    </Box>
                                                );
                                            })
                                        )}


                                    </Box>)}





                                {(duration && isForAdmin) && (< Stack >
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
                                                    contractId={contractId}
                                                    comment={element}
                                                    currentTime={currentTime}
                                                    videoPlayer={playerRef}
                                                    key={element.id}
                                                    refresh={refresh}
                                                    draftId={activeDraft.id}
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

const ShareButton = ({ draftId, contractId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [link, setLink] = useState('');
    const textRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleClick = async (event) => {
        setAnchorEl(event.currentTarget);
        setLoading(true);
        const response = await generateReviewalLinkForDraft(draftId, contractId);
        console.log("Response is", response);
        setLink(response);
        setLoading(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const copyLink = () => {
        if (textRef.current) {
            textRef.current.select();
            document.execCommand('copy');
            handleClose();
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>

            <IconButton onClick={handleClick}>
                <ShareIcon
                    sx={{ color: 'green' }}

                />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >

                {loading ? (<div style={{ padding: '16px' }}>
                    <CircularProgress sx={{ marginX: 3 }} /></div>) :
                    <div style={{ padding: '16px' }}>
                        <TextField
                            fullWidth
                            value={link}
                            inputRef={textRef}
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={copyLink}>
                                        <CopyIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </div>

                }
            </Popover>
        </div>
    );
};



