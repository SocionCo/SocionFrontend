import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContractSticker from "../components/avatar/ContractSticker";
import SocionHeader from "../components/headers/SocionHeader";
import TalentSearchBar from "../components/headers/TalentSearchBar";
import NewCampaignModal from "../components/modals/NewCampaignModal";
import InfluencerSidebar from "../components/navigation/InfluencerSidebar.js";
import Sidebar from "../components/navigation/Sidebar";
import { getAllAgencyContractsForCurrentUser } from "../services/agencyServices";
import { getUserInformation } from "../services/influencerServices";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";


const Campaigns = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [props, setProps] = useState(null);
    const [updateRefresh, setUpdateRefresh] = useState(false);



    const userType = localStorage.getItem("user-type");


    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserInformation();
            setProps(result);
        }
        fetchData();

    }, [updateRefresh]);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const refreshRows = () => {
        setUpdateRefresh(!updateRefresh);
        setOpen(false);
    }

    React.useEffect(() => {
        async function getData() {
            const returnedContracts = await getAllAgencyContractsForCurrentUser();
            setContracts(returnedContracts);
            console.log("Returned contracts", returnedContracts);
        }
        getData();
    }, [updateRefresh]);

    const filteredContracts = contracts.filter(contract =>
        contract.name.toLowerCase().includes(searchInput.toLowerCase()) || contract.companyName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleSearchChange = (event) => {
        console.log("Search change");
        setSearchInput(event.target.value);
    };



    return (
        <Box sx={{ m: 1, p: 1 }}>
            <NewCampaignModal
                open={open}
                handleClose={handleClose}
                agencyId={props ? props.agencyId : null}
                refresh={refreshRows} />

            <SocionHeader showButton={false}></SocionHeader>
            <Grid container spacing={0}>
                <Grid item xs={12} md={2}>
                    {/* Sidebar appears full width on mobile and 2/12ths on medium screens */}
                    {(userType === "Admin" || userType === "TalentManager") ?
                        (<Sidebar index={1}></Sidebar>) : (<InfluencerSidebar index={1} />)
                    }
                </Grid>
                <Grid item xs={12} md={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h3' component='h3'>Campaigns</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TalentSearchBar handleOpen={handleOpen} onChange={handleSearchChange} label="New Campaign" />
                        </Grid>
                        {
                            filteredContracts.map(contract => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={contract.id}>
                                        {/* Single column on mobile, two on small screens, three on medium screens */}
                                        <Box key={contract.id} sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Button
                                                onClick={() => {
                                                    navigate("/campaign/" + contract.id);
                                                }}
                                                fullWidth
                                            >
                                                <ContractSticker 
                                                contract={contract}
                                                refresh={refreshRows}
                                                 />
                                            </Button>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Campaigns;