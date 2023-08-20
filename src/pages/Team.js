import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import EmployeeSticker from "../components/avatar/EmployeeSticker";
import SocionHeader from "../components/headers/SocionHeader";
import TalentSearchBar from "../components/headers/TalentSearchBar";
import InviteTalentManagerModal from "../components/modals/InviteTalentManagerModal";
import Sidebar from "../components/navigation/Sidebar";
import { getTalentManagersAtUsersAgency } from "../services/agencyServices";

const TalentDashboard = () => {
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [talentManagers, setTalentManagers] = useState([]);

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
                            <TalentSearchBar handleOpen={handleOpen} onChange={handleSearchChange} label="Invite Talent Manager" />
                        </Grid>
                        {
                            filteredManagers.map(manager => (
                                <Grid item xs={12} sm={6} md={4} key={manager.email}>
                                    <EmployeeSticker influencer={manager} />
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