import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ChatIcon from '@mui/icons-material/Chat';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import LightModeIcon from '@mui/icons-material/LightMode';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import { Box, CircularProgress, Grid, IconButton, List, ListItem, MenuItem, Paper, Select, Switch, ThemeProvider, Typography, createTheme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import Chip from '@mui/material/Chip';
import ListItemAvatar from '@mui/material/ListItemAvatar/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField/TextField';
import { Stack } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import '../../App.css';
import { getContractDetailsWithId } from '../../services/campaignServices';
import { addCommentToDraft, deleteCommentFromDraft, generateReviewalLinkForDraft, replyToComment, reviewDraft } from '../../services/draftServices';
import { getUserDetails } from '../../services/userServices';
import { formatDuration, timeAgo } from '../../util/conversionUtil';
import StringAvatar from '../avatar/StringAvatar';



export const timeConvert = (seconds) => {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format as MM:SS
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    return (formattedTime);
};



const lightTheme = createTheme({
    palette: {
        primary: {
            main: 'rgb(0,0,0)',
        },
        background: {
            default: 'rgb(255,255,255)', // White 
            secondary: 'rgb(228,228,228)',
            commentBox: 'rgb(228,228,228)',
            offWhite: '#FAFAFA'
        },
    },
});

const darkTheme = createTheme({
    palette: {
        primary: {
            main: 'rgb(255,255,255)', // Dark 
            secondary: 'rgb(34,37,48)'
        },
        background: {
            default: 'rgb(32,34,43)', // Lighter dark
            secondary: 'rgb(20,22,28)', // Dark 
            commentBox: 'rgb(47,53,68)'
        },
    },
});


export const CommentSticker = ({ contractId, videoPlayer, comment, currentTime, refresh, draftId, darkMode }) => {
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
        <Box sx={{ width: '100%', backgroundColor: darkMode ? darkTheme.palette.background.secondary : lightTheme.palette.background.secondary }}>
            <ListItem
                divider={false}
                selected={Math.abs(currentTime - comment.timeStamp) < 1 && currentTime > 0}
                sx={{
                    '&:hover': {
                        backgroundColor: 'rgba(0, 161, 82, 0.2)'
                    },
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: darkMode ? darkTheme.palette.background.secondary : lightTheme.palette.background.secondary,
                    borderBottom: '1px solid black'


                }}
                onClick={() => videoPlayer.current.seekTo(comment.timeStamp, 'seconds')}
            >


                <ListItemAvatar sx={{ m: 0 }}>
                    <StringAvatar name={comment.displayName} />
                </ListItemAvatar>

                <Stack sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemText
                            sx={{ color: 'rgb(157,166,179)' }}
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

                            } xr
                            secondary={
                                <Box>
                                    <Box >
                                        <Typography

                                            sx={{ wordBreak: 'break-word', maxWidth: '100%', color: 'rgb(157,166,179)' }}
                                        >{comment.comment}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography onClick={(e) => {
                                                e.stopPropagation();
                                                setShowRepliesMode(false);
                                                setReplyMode(!replyMode);
                                            }}
                                                variant='caption'
                                                sx={{ color: 'rgb(157,166,179)' }}
                                            >Reply</Typography>
                                            {(comment.replies && comment.replies.length > 0 && !showRepliesMode) &&
                                                (<Typography
                                                    sx={{ color: 'rgb(157,166,179)' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setReplyMode(false);
                                                        setShowRepliesMode(!showRepliesMode);
                                                    }}
                                                    variant='caption'>{"Show Replies (" + comment.replies.length + ")"}</Typography>

                                                )
                                            }
                                            {(comment.replies && comment.replies.length > 0 && showRepliesMode) &&
                                                (<Typography
                                                    sx={{ color: 'rgb(157,166,179)' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
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
                                            <IconButton onClick={async (e) => {
                                                await replyToComment(contractId, draftId, currentText, null, comment.id);
                                                setReplyMode(false);
                                                setShowRepliesMode(true);
                                                refresh();
                                            }}>
                                                <SendIcon
                                                    sx={{ color: 'rgb(157,166,179)' }}
                                                />
                                            </IconButton>
                                        </Box>

                                    )}
                                </Box>

                            }

                        />



                    </Box>
                </Stack>
                < IconButton
                    onClick={async (event) => {
                        event.stopPropagation();
                        await deleteCommentFromDraft(comment.id);
                        refresh();
                    }}>
                    <DeleteIcon />
                </IconButton >

            </ListItem >
            {showRepliesMode && (
                <Box
                    sx={{
                        paddingLeft: 4,
                        backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default
                    }}
                >
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
                                    darkMode={darkMode}
                                />
                            );
                        })
                    }
                </Box>
            )}
        </Box>
    );
}

export default function VideoPlayer({ isForAdmin = false, contractId, refreshOuterPage, handleClose }) {
    const [activeDraft, setActiveDraft] = React.useState(null);
    const [duration, setDuration] = useState(null);
    const playerRef = useRef(null);
    const [textFieldContains, setTextFieldContains] = useState('');
    const [useTimeStamp, setUseTimeStamp] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [updateDrafts, setUpdatedDrafts] = useState(null);
    const [videosLeftToLoad, setVideosLeftToLoad] = useState(null);
    const [videoDurations, setVideoDurations] = useState({});
    const [userName, setUserName] = useState(null);
    const [darkMode, setDarkMode] = useState(true);
    const [shelfOpen, setShelfOpen] = useState(false);




    const isLargeScreen = useMediaQuery((darkMode ? darkTheme : lightTheme).breakpoints.up('lg'));
    const isMediumScreen = useMediaQuery((darkMode ? darkTheme : lightTheme).breakpoints.between('md', 'lg'));
    const isSmallScreen = useMediaQuery((darkMode ? darkTheme : lightTheme).breakpoints.between('sm', 'md'));

    let screenSize = '';
    if (isLargeScreen) {
        screenSize = 'lg';
    } else if (isMediumScreen) {
        screenSize = 'md';
    } else if (isSmallScreen) {
        screenSize = 'sm';
    } else {
        screenSize = 'xs';
    }


    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
        console.log("Dark Mode: ", darkMode);
    }


    React.useEffect(() => {
        const getUserInfo = async () => {
            const response = await getUserDetails();
            setUserName(response.data.fullName);
        };

        getUserInfo();
    },[]);

    const handleVideoDuration = (url, duration) => {
        setVideoDurations((prevDurations) => ({
            ...prevDurations,
            [url]: duration,
        }));
    };

    console.log("Drafts", activeDraft);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getContractDetailsWithId(contractId);
            setUpdatedDrafts(response.drafts);
            setVideosLeftToLoad(response.drafts.length);
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
        setDuration(d);
    };





    if (!activeDraft) {


        return (
            <Box sx={{ height: '100vh', backgroundColor: (videosLeftToLoad === 0) ? '#444a60' : 'white' }} >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
                    {videosLeftToLoad !== 0 && (
                        <CircularProgress />
                    )}
                </Box>
                <Box sx={{ width: '100%', height: '100%', opacity: (videosLeftToLoad === 0) ? '100' : '0', backgroundColor: (videosLeftToLoad === 0) ? '#444a60' : 'white' }}>
                    <IconButton
                        sx={{ position: 'absolute', top: 4, right: 4, zIndex: 1 }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                        <Typography sx={{ m: 1 }} variant='h5'>Select Draft</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Grid container sx={{ backgroundColor: '#444a60', p: 2 }} spacing={2}>
                            {
                                updateDrafts && updateDrafts.length === 0 ?
                                    (
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography>No Drafts Yet!</Typography>
                                        </Box>
                                    )
                                    :
                                    (updateDrafts && updateDrafts.map(element => {
                                        return (
                                            <Grid item xs={12} s={6} md={3} key={element.reference} >
                                                <Stack>
                                                    <Box
                                                        sx={{
                                                            position: 'relative',
                                                            backgroundColor: 'black',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            overflow: 'hidden',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => {
                                                            setActiveDraft(element);
                                                        }}
                                                    >
                                                        <ReactPlayer
                                                            url={element.reference}
                                                            disabled
                                                            playing={false}
                                                            onDuration={(duration) => {
                                                                handleVideoDuration(element.reference, duration);

                                                            }}
                                                            onReady={() => {
                                                                setVideosLeftToLoad(prev => prev - 1);
                                                                console.log("Ready now at,", videosLeftToLoad);
                                                            }}
                                                        />
                                                        <Chip
                                                            color={element.approvalStatus === "APPROVED" ? "success" : (element.approvalStatus === "UNREVIEWED" ? "warning" : "error")}
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 4,
                                                                right: 4,
                                                                padding: '4px',
                                                                borderRadius: '20px'
                                                            }}
                                                            label={element.approvalStatus}
                                                        >
                                                        </Chip>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                position: 'absolute',
                                                                bottom: 4,
                                                                right: 4,
                                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                                color: 'white',
                                                                padding: '4px',
                                                                borderRadius: '4px'
                                                            }}
                                                        >
                                                            {formatDuration(videoDurations[element.reference])}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ backgroundColor: '#384666', width: '100%' }}>
                                                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mX: 2 }}>
                                                            <Box sx={{ marginRight: 2, marginLeft: 2 }}>
                                                                <StringAvatar
                                                                    name={element.fullName}
                                                                />
                                                            </Box>
                                                            <Box sx={{ width: '100%', p: 1 }}>
                                                                <Typography variant='h6'>{element.draftName}</Typography>
                                                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Box sx={{ display: 'flex', alignContent: 'center' }}>
                                                                        <Typography>{element.dateCreated}</Typography>
                                                                    </Box>

                                                                    <Box sx={{ display: 'flex', alignContent: 'center' }}>
                                                                        <ChatIcon sx={{ marginRight: 1 }} />
                                                                        <Typography variant="caption">
                                                                            {element.videoComments ? (element.videoComments.length) : "0"}
                                                                        </Typography>

                                                                    </Box>
                                                                </Box>
                                                            </Box>

                                                        </Box>

                                                    </Box>
                                                </Stack>
                                            </Grid>)
                                    }))}
                        </Grid>
                    </Box >
                </Box>
            </Box>
        );
    }




    //Mobile View
    if (screenSize === "sm" || screenSize === "xs") {
        return (
            <Grid container width={'100%'} height={'100vh'} sx={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default }}>
                <Box sx={{ padding: 0, width: '100%' }}>
                    <ToolBar
                        darkMode={darkMode}
                        activeDraft={activeDraft}
                        handleDarkModeToggle={handleDarkModeToggle}
                        contractId={contractId}
                        updateDrafts={updateDrafts}
                        handleClose={handleClose}
                        handleDraftChange={handleDraftChange}
                        handleUpdateDraftReview={handleUpdateDraftReview}
                        compact={true}
                    />
                </Box>
                <Box>
                    <Box>
                        <ReactPlayer
                            controls
                            width='100%'
                            height={shelfOpen ? '30vh' : '60vh'}
                            url={activeDraft?.reference}
                            onDuration={handleDuration}
                            onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
                            ref={playerRef}
                            progressInterval={100}
                            style={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.offWhite, padding: 0, margin: 0 }}

                        />
                    </Box>
                    <Box sx={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default }}>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default }}
                        >
                            <IconButton
                                onClick={() => setShelfOpen(!shelfOpen)}
                            >
                                {!shelfOpen ? (
                                    <KeyboardDoubleArrowUpIcon />
                                ) : (
                                    <KeyboardDoubleArrowDownIcon />
                                )
                                }
                            </IconButton>
                        </Box>

                        <Box>

                            {(duration) && (
                                < Stack sx={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default, paddingBottom: 1 }}>
                                    <Box elevation={3} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{
                                            padding: 2,
                                            margin: 'auto',
                                            backgroundColor: darkMode ? darkTheme.palette.background.commentBox : lightTheme.palette.background.commentBox,
                                            borderRadius: '10px',
                                            width: '75%',
                                        }}>

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 2
                                            }}>
                                                <StringAvatar
                                                    name={userName}
                                                />
                                                <TextField
                                                    onChange={(event) => setTextFieldContains(event.target.value)}
                                                    variant="outlined"
                                                    value={textFieldContains}
                                                    width='75%'
                                                    sx={{ flexGrow: 10, marginX: 1 }}
                                                    placeholder="Leave a comment..." />
                                            </Box>

                                            <Box sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '10%',
                                                    backgroundColor: darkMode ? darkTheme.palette.primary.secondary : lightTheme.palette.background.offW
                                                }}>
                                                    <AccessTimeIcon sx={{
                                                        marginX: 1,
                                                        color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main
                                                    }} />
                                                    <Typography
                                                        sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }}
                                                    >{timeConvert(playerRef.current.getCurrentTime())}</Typography>
                                                    <Checkbox
                                                        checked={useTimeStamp}
                                                        sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }}
                                                        onChange={(event) => setUseTimeStamp(event.target.checked)}
                                                    />
                                                </Box>
                                                <Box>
                                                    <IconButton
                                                        onClick={handleSendComment}
                                                        sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }}
                                                        disabled={textFieldContains.length === 0}
                                                    >
                                                        <SendIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                            )}

                            <Paper elevation={5} square style={{ backgroundColor: darkMode ? darkTheme.palette.background.secondary : lightTheme.palette.background.secondary, overflow: 'auto', maxHeight: 600 }}>
                                <div style={{ maxHeight: shelfOpen ? '40vh' : '10vh', overflowY: 'auto' }}>
                                    <List sx={{ width: '100%', margin: 0, backgroundColor: darkMode ? darkTheme.palette.background.secondary : lightTheme.palette.background.secondary }}>
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
                                                            darkMode={darkMode}
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
                                </div>
                            </Paper>

                        </Box>
                    </Box>
                </Box>
            </Grid>

        );

    }


    return (
        <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
            <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
                <ToolBar
                    darkMode={darkMode}
                    activeDraft={activeDraft}
                    handleDarkModeToggle={handleDarkModeToggle}
                    contractId={contractId}
                    updateDrafts={updateDrafts}
                    handleClose={handleClose}
                    handleDraftChange={handleDraftChange}
                    handleUpdateDraftReview={handleUpdateDraftReview}
                />
                <Grid item xs={12} md={4} sx={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default, borderBottom: '2.5px solid black' }}>
                    <Box>

                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>

                    {/* Video Player */}
                    <Stack>
                        <Box>
                            <ReactPlayer
                                controls
                                width='100%'
                                height='70vh'
                                url={activeDraft?.reference}
                                onDuration={handleDuration}
                                onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
                                ref={playerRef}
                                progressInterval={100}
                                style={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.offWhite }}

                            />



                            {duration && (
                                <Box
                                    sx={{
                                        height: '60px',
                                        width: '100%',
                                        position: 'relative',
                                        marginTop: -1,
                                        overflow: 'hidden',
                                        backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,

                                    }}
                                >
                                    {activeDraft && activeDraft.videoComments && activeDraft.videoComments.length > 0 && (
                                        activeDraft.videoComments.map((comment, index) => {
                                            const position = (comment.timeStamp / duration) * 100;
                                            var adjustedPosition = position > 98 ? 98 : position;
                                            adjustedPosition = position < 3 ? 3 : position;
                                            return (
                                                <Box
                                                    key={index}
                                                    onClick={() => playerRef.current.seekTo(comment.timeStamp, 'seconds')}
                                                    style={{
                                                        position: 'absolute',
                                                        left: `${adjustedPosition}%`,
                                                        bottom: '10px',
                                                        backgroundColor: 'blue',
                                                        transform: 'translateX(-50%)',
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



                            {(duration) && (
                                < Stack sx={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default, paddingBottom: 10 }}>
                                    <Box elevation={3} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{
                                            padding: 2,
                                            margin: 'auto',
                                            backgroundColor: darkMode ? darkTheme.palette.background.commentBox : lightTheme.palette.background.commentBox,
                                            borderRadius: '10px',
                                            width: '75%',
                                        }}>

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 2
                                            }}>
                                                <StringAvatar
                                                    name={userName}
                                                />
                                                <TextField
                                                    onChange={(event) => setTextFieldContains(event.target.value)}
                                                    variant="outlined"
                                                    value={textFieldContains}
                                                    width='75%'
                                                    sx={{ flexGrow: 10, marginX: 1 }}
                                                    placeholder="Leave a comment..." />
                                            </Box>

                                            <Box sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '10%',
                                                    backgroundColor: darkMode ? darkTheme.palette.primary.secondary : lightTheme.palette.background.offW
                                                }}>
                                                    <AccessTimeIcon sx={{
                                                        marginX: 1,
                                                        color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main
                                                    }} />
                                                    <Typography
                                                        sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }}
                                                    >{timeConvert(playerRef.current.getCurrentTime())}</Typography>
                                                    <Checkbox
                                                        checked={useTimeStamp}
                                                        sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }}
                                                        onChange={(event) => setUseTimeStamp(event.target.checked)}
                                                    />
                                                </Box>
                                                <Box>
                                                    <IconButton
                                                        onClick={handleSendComment}
                                                        sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }}
                                                        disabled={textFieldContains.length === 0}
                                                    >
                                                        <SendIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Stack >)}
                        </Box >
                    </Stack >
                </Grid >


                <Grid item xs={12} md={4} sx={{ borderBottom: darkMode ? "2px solid black" : "2px solid black", borderLeft: darkMode ? "2px solid black" : "2px solid black", backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.offWhite, paddingTop: 2 }}>
                    <Box sx={{ borderBottom: darkMode ? "2px solid black" : '', paddingBottom: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.offWhite }}>
                            <Typography
                                sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main, marginX: 3 }}
                                variant='h6'
                            >{activeDraft.fullName}</Typography>
                            <Typography
                                sx={{ color: 'grey', marginX: 1 }}
                                variant='caption'
                            >{"Uploaded: " + activeDraft.dateCreated}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.offWhite, }}>
                            <Typography
                                sx={{
                                    color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main,
                                    marginX: 3
                                }}
                            >{activeDraft.description}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{m: 1}}>
                        <Paper elevation={5} square style={{ backgroundColor: darkMode ? darkTheme.palette.background.secondary : lightTheme.palette.background.secondary, overflow: 'auto', maxHeight: 600 }}>

                            <List sx={{ width: '100%', backgroundColor: darkMode ? darkTheme.palette.background.secondary : lightTheme.palette.background.secondary }}>
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
                                                    darkMode={darkMode}
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
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

const ToolBar = ({ darkMode, activeDraft, handleDarkModeToggle, contractId, updateDrafts, handleClose, handleDraftChange, handleUpdateDraftReview, compact = false }) => {
    return (
        <>
            <Grid item xs={12} md={8} sx={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default, borderBottom: '2.5px solid black' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={handleClose} sx={{ marginRight: compact ? .5 : 2 }}>
                            <ArrowBackIosNewIcon sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }} />
                        </IconButton>
                        <Select
                            sx={{
                                color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main,
                                },
                                '& .MuiSvgIcon-root': {
                                    color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main,
                                }
                            }}
                            variant='standard'
                            disableUnderline
                            value={activeDraft ? activeDraft.id : "Select Draft"}
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

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Select
                            variant='standard'
                            disableUnderline
                            sx={{
                                marginX: compact ? .5 : 2,
                                color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main,
                                },
                                '& .MuiSvgIcon-root, & .circle-icon': {
                                    color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main,
                                }
                            }}
                            value={activeDraft?.approvalStatus || ''}
                            style={{ minWidth: '120px', height: '40px', borderRadius: '4px', color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }}
                            onChange={handleUpdateDraftReview}
                        >
                            <MenuItem value="UNREVIEWED">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {!compact && (<CircleIcon className="orange" sx={{ marginRight: 1 }} />)}
                                    <Typography>Unreviewed</Typography>
                                </div>
                            </MenuItem>
                            <MenuItem value="APPROVED">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {!compact && (<CircleIcon className="green" sx={{ marginRight: 1 }} />)}
                                    <Typography>Approved</Typography>
                                </div>
                            </MenuItem>
                            <MenuItem value="REJECTED">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {!compact && (<CircleIcon className="red" sx={{ marginRight: 1 }} />)}
                                    <Typography>Rejected</Typography>
                                </div></MenuItem>
                        </Select>

                        <ShareButton
                            draftId={activeDraft.id}
                            contractId={contractId}
                            darkMode={darkMode}
                            compact={compact}
                        />

                        <MoreIcon
                            handleDarkModeToggle={handleDarkModeToggle}
                            darkMode={darkMode}
                            compact={compact}
                        />

                    </Box>

                </Box>
            </Grid>
        </>
    );
}

const MoreIcon = ({ handleDarkModeToggle, darkMode, compact = false }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const textRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = async (event) => {
        setAnchorEl(event.currentTarget);
    };


    return (

        <div>
            <IconButton onClick={handleClick} sx={{ marginLeft: compact ? 1 : 2 }}>
                <MoreHorizIcon sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }} />
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
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    <LightModeIcon />
                    <Switch checked={darkMode} color='default' onClick={handleDarkModeToggle} />
                    <DarkModeIcon />
                </Box>
            </Popover>
        </div>

    );
}


const ShareButton = ({ draftId, contractId, darkMode, compact = false }) => {
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

    const center = { display: 'flex', justifyContent: 'center', alignItems: 'center' }

    return (
        <div>
            <IconButton onClick={handleClick}>
                <ShareIcon
                    sx={{ color: darkMode ? darkTheme.palette.primary.main : lightTheme.palette.primary.main }}
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
                    <CircularProgress sx={{ marginX: compact ? 1 : 3 }} /></div>) :
                    <Box sx={{ width: '500px', paddingBottom: 3 }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box sx={{ m: 1, p: 1 }}>
                                    <Typography>Share</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sx={center}>

                                <Button
                                    variant='contained'
                                    sx={{ borderRadius: '10px'}}
                                    onClick={() => {navigator.clipboard.writeText(link)}}

                                >Copy Link</Button>
                            </Grid>
                            <Grid item xs={8} sx={center}>
                                <TextField
                                    value={link}
                                    inputRef={textRef}
                                    variant="outlined"
                                    sx={{ width: '300px' }}
                                />
                            </Grid>
                            <Grid item xs={4} sx={{ ...center, marginTop: 3 }} >

                                <Button
                                    variant='contained'
                                    sx={{ borderRadius: '10px'}}
                                    onClick={() => {navigator.clipboard.writeText("'s draft from the " + "campaign is waiting for you to review it. Access the dashboard here: " + link)}}

                                >Copy Message</Button>
                            </Grid>
                            <Grid item xs={8} sx={{ ...center, marginTop: 3 }}>
                                <TextField
                                    value={"'s draft from the " + "campaign is waiting for you to review it. Access the dashboard here: " + link}
                                    multiline
                                    inputRef={textRef}
                                    variant="outlined"
                                    sx={{ width: '300px' }}
                                />
                            </Grid>

                        </Grid>
                    </Box>

                }
            </Popover>
        </div>
    );
};



