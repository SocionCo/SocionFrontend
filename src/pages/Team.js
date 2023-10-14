import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, IconButton, InputAdornment, TextField, Typography, Button } from "@mui/material";
import EmployeeSticker from "../components/avatar/EmployeeSticker";
import SocionHeader from "../components/headers/SocionHeader";
import InviteTalentManagerModal from "../components/modals/InviteTalentManagerModal";
import Sidebar from "../components/navigation/Sidebar";
import { getTalentManagersAtUsersAgency } from "../services/agencyServices";
import React, { useState } from 'react';

const TalentDashboard = () => {
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [talentManagers, setTalentManagers] = useState([]);
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    React.useEffect(() => {
        async function getData() {
            const returnedManagers = await getTalentManagersAtUsersAgency();
            setTalentManagers(returnedManagers);
            setLoading(false);
        }
        getData();
    }, []);

    const filteredManagers = talentManagers.filter(talentManager =>
        talentManager.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };



    return (
        <Box sx={{ m: 1, p: 1 }}>
            <InviteTalentManagerModal open={open} handleClose={handleClose} />
            <SocionHeader showButton={false}></SocionHeader>
            <Grid container spacing={0}>
                <Grid item xs={12} md={2}>
                    <Sidebar index={3} />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h3' component='h3'>Team</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                                <Typography variant='h6' component='h1'>{"All Managers: " + talentManagers.length}</Typography>

                                <Box sx={{ display: 'flex', position: 'relative' }}>
                                    <IconButton onClick={() => setSearchBarVisible(!searchBarVisible)}>
                                        <SearchIcon />
                                    </IconButton>
                                    <IconButton onClick={handleOpen}>
                                        <AddIcon />
                                    </IconButton>

                                    {
                                        searchBarVisible && (
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
                                        )
                                    }
                                </Box>
                            </Box>

                        </Grid>
                        {
                            filteredManagers.map(influencer => (
                                <Grid item xs={12} sm={6} md={4} key={influencer.email}>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button
                                            sx={{ height: '100%', width: '100%', cursor: 'default' }}
                                            onClick={() => console.log("")}
                                            fullWidth
                                        >
                                            <EmployeeSticker influencer={influencer} />
                                        </Button>
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TalentDashboard;