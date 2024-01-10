import { Box, Button, Grid, Typography, Tab, IconButton, TextField, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import EmployeeSticker from "../components/avatar/EmployeeSticker";
import SocionHeader from "../components/headers/SocionHeader";
import TalentSearchBar from "../components/headers/TalentSearchBar";
import InfluencerDetailsModal from "../components/modals/InfluencerDetailsModal";
import InviteInfluencerModal from "../components/modals/InviteInfluencerModal";
import Sidebar from "../components/navigation/Sidebar";
import { getInfluencersManagedBy } from "../services/influencerServices";
import { TabContext, TabList } from "@mui/lab";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress } from '@mui/material';


const TalentDashboard = () => {
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [influencers, setInfluencers] = useState([]);
    const [detailViewOpen, setDetailViewOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTab, setSelectedTab] = useState("0");
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleDetailViewOpen = (user) => {
        setSelectedUser(user);
        setDetailViewOpen(true);
    }

    const handleDetailViewClose = () => {
        setSelectedUser(null);
        setDetailViewOpen(false);

    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    React.useEffect(() => {
        async function getData() {
            const returnedInfluencers = await getInfluencersManagedBy(false);
            setInfluencers(returnedInfluencers);
            setLoading(false);
        }
        getData();
    }, []);

    const filteredInfluencers = influencers.filter(influencer =>
        influencer.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    const userType = localStorage.getItem("user-type");




    return (
        <Box sx={{ m: 1, p: 1 }}>
            {detailViewOpen &&
                <InfluencerDetailsModal
                    open={detailViewOpen}
                    handleClose={handleDetailViewClose}
                    user={selectedUser}
                />
            }
            <InviteInfluencerModal open={open} handleClose={handleClose}></InviteInfluencerModal>
            <SocionHeader showButton={false}></SocionHeader>
            <Grid container spacing={0}>
                <Grid item xs={12} md={2}>
                    <Sidebar index={2} />
                </Grid>
                <Grid item xs={12} md={10}>
                    {loading ? (
                        // Display centered CircularProgress when loading is true
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h3' component='h3'>Talent</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                                    <Typography variant='h6' component='h1'>{"All Talent: " + influencers.length}</Typography>
                                    <Box sx={{ display: 'flex', position: 'relative' }}>
                                        <IconButton onClick={() => setSearchBarVisible(!searchBarVisible)}>
                                            <SearchIcon />
                                        </IconButton>
                                        {(userType === "Admin" || userType === "TalentManager") && (<IconButton onClick={handleOpen}>
                                            <AddIcon />
                                        </IconButton>)}
                                        {searchBarVisible && (
                                            <TextField
                                                sx={{
                                                    position: 'absolute',
                                                    width: "300px",
                                                    top: '-60px',  // adjust this based on the height of your TextField
                                                    left: '-200px',
                                                    zIndex: 10,
                                                    background: 'white'
                                                }}
                                                fullWidth
                                                placeholder="Search..."
                                                onChange={handleSearchChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </Grid>





                            {

                                filteredInfluencers.length == 0 ? (
                                    <Box sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 2
                                    }}>
                                        <Typography variant='h6' component={'h6'}>No talent yet! Invite someone by clicking the + button.</Typography>
                                    </Box>

                                ) :



                                    (filteredInfluencers.map(influencer => (
                                        <Grid item xs={12} sm={6} md={4} key={influencer.email}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Button
                                                    sx={{ height: '100%', width: '100%' }}
                                                    onClick={() => { handleDetailViewOpen(influencer); }}
                                                    fullWidth
                                                >
                                                    <EmployeeSticker influencer={influencer} />
                                                </Button>
                                            </Box>
                                        </Grid>
                                    )))}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default TalentDashboard;