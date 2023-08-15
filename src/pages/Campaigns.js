import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContractSticker from "../components/avatar/ContractSticker";
import SocionHeader from "../components/headers/SocionHeader";
import TalentSearchBar from "../components/headers/TalentSearchBar";
import ContractDetailView from "../components/modals/ContractDetailView";
import NewCampaignModal from "../components/modals/NewCampaignModal";
import InfluencerSidebar from "../components/navigation/InfluencerSidebar.js";
import Sidebar from "../components/navigation/Sidebar";
import { getAllAgencyContractsForCurrentUser } from "../services/agencyServices";
import { getUserInformation } from "../services/influencerServices";
import InfluencerContractDetailView from "../components/modals/InfluencerContractDetailView";

const Campaigns = () => {
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [detailView, setDetailView] = useState(false);
    const [currentContractId, setCurrentContractId] = useState(null);
    const [props, setProps] = useState(null);


    const userType = localStorage.getItem("user-type");


    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserInformation();
            setProps(result);
        }
        fetchData();

    }, []);

    const handleDetailClose = () => {
        setDetailView(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const refreshRows = () => {
        window.location.reload();
    }

    React.useEffect(() => {
        async function getData() {
            const returnedContracts = await getAllAgencyContractsForCurrentUser();
            setContracts(returnedContracts);
            console.log("Returned contracts", returnedContracts);
        }
        getData();
    }, []);

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

            {userType === "Admin" ?
                (<ContractDetailView
                    open={detailView}
                    handleClose={handleDetailClose}
                    contractId={currentContractId}
                ></ContractDetailView>) : (<InfluencerContractDetailView
                    open={detailView}
                    handleClose={handleDetailClose}
                    contractId={currentContractId}
                />)
            }
            
            <SocionHeader showButton={false}></SocionHeader>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {userType === "Admin" ?
                        (<Sidebar index={1}></Sidebar>) : (<InfluencerSidebar index={1} />)
                    }
                </Grid>
                <Grid item xs={9}>
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

                                    <Box key={contract.id} sx={{
                                        m: 1,
                                        p: 1,
                                    }}>
                                        <Button onClick={() => {
                                            setCurrentContractId(contract.id);
                                            setDetailView(true);
                                        }}>
                                            <ContractSticker contract={contract} />
                                        </Button>
                                    </Box>

                                )
                            })

                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
}

export default Campaigns;