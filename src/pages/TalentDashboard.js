import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import EmployeeSticker from "../components/avatar/EmployeeSticker";
import SocionHeader from "../components/headers/SocionHeader";
import TalentSearchBar from "../components/headers/TalentSearchBar";
import InfluencerDetailsModal from "../components/modals/InfluencerDetailsModal";
import InviteInfluencerModal from "../components/modals/InviteInfluencerModal";
import Sidebar from "../components/navigation/Sidebar";
import { getInfluencersManagedBy } from "../services/influencerServices";

const TalentDashboard = () => {
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [influencers, setInfluencers] = useState([]);
    const [detailViewOpen, setDetailViewOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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
            console.log("Ok this is actually it");
            const returnedInfluencers = await getInfluencersManagedBy(false);
            setInfluencers(returnedInfluencers);
        }
        getData();
    }, []);

    const filteredInfluencers = influencers.filter(influencer =>
        influencer.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };



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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h3' component='h3'>Talent</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TalentSearchBar handleOpen={handleOpen} onChange={handleSearchChange} />
                        </Grid>
                        {
                            filteredInfluencers.map(influencer => (
                                <Grid item xs={12} sm={6} md={4} key={influencer.email}>
                                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems : 'center' }}>
                                        <Button 
                                            sx={{ height: '100%', width: '100%' }} 
                                            onClick={() => { handleDetailViewOpen(influencer); }}
                                            fullWidth
                                        >
                                            <EmployeeSticker influencer={ influencer } />
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