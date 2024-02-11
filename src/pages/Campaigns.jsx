import { Box, Button, Grid, Paper, Typography, Tab, TextField, InputAdornment, IconButton, LinearProgress, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContractSticker from "../components/avatar/ContractSticker";
import SocionHeader from "../components/headers/SocionHeader";
import TalentSearchBar from "../components/headers/TalentSearchBar";
import NewCampaignModal from "../components/modals/NewCampaignModal";
import InfluencerSidebar from "../components/navigation/InfluencerSidebar.jsx";
import Sidebar from "../components/navigation/Sidebar";
import { getAllAgencyContractsForCurrentUser } from "../services/agencyServices";
import { getUserInformation } from "../services/influencerServices";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ControlCameraOutlined } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Searchbar from "../components/forms/inputs/Searchbar";


const Campaigns = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [props, setProps] = useState(null);
    const [updateRefresh, setUpdateRefresh] = useState(false);
    const [selectedTab, setSelectedTab] = useState("0");
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [loading, setLoading] = useState(true);



    const filteredContracts = contracts.filter(contract =>
        contract.name.toLowerCase().includes(searchInput.toLowerCase()) || contract.companyName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const toggleSearchBar = () => {
        setSearchBarVisible(!searchBarVisible);
    };


    let displayedContracts;
    switch (selectedTab) {
        case "0":

            displayedContracts = filteredContracts;
            break;
        case "1":
            displayedContracts = filteredContracts.filter(contract => !contract.completed);
            break;
        case "2":
            displayedContracts = filteredContracts.filter(contract => contract.completed);
            break;
        default:
            displayedContracts = filteredContracts;
    }

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };



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
            setLoading(false);
        }
        getData();
    }, [updateRefresh]);



    const handleSearchChange = (event) => {
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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                                <Typography variant='h6' component='h1'>{"All Campaigns: " + contracts.length}</Typography>

                                <Box sx={{ display: 'flex', position: 'relative' }}>
                                    <TabContext value={selectedTab}>
                                        <TabList
                                            variant="scrollable"
                                            allowScrollButtonsMobile
                                            onChange={handleChange}
                                        >
                                            <Tab label="All" value="0" />
                                            <Tab label="Active" value="1" />
                                            <Tab label="Completed" value="2" />
                                        </TabList>
                                    </TabContext>
                                    <IconButton onClick={() => setSearchBarVisible(!searchBarVisible)}>
                                        <SearchIcon />
                                    </IconButton>
                                    {(userType === "Admin" || userType === "TalentManager") && (<IconButton onClick={handleOpen}>
                                        <AddIcon />
                                    </IconButton>)}

                                    {
                                        searchBarVisible && (<Searchbar
                                            handleChange={handleSearchChange}
                                        />)

                                    }
                                </Box>
                            </Box>

                        </Grid>

                        {loading ? (
                            <Box sx={{width: '100%',display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress/>
                            </Box>

                        ) :

                            (contracts.length == 0) ? (
                                <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 2
                                }}>
                                    <Typography variant='h6' component={'h6'}>No campaigns yet! Add one by clicking the + button.</Typography>
                                </Box>

                            ) : (displayedContracts.map(contract => {
                                return (
                                    <Grid item xs={12} key={contract.id}>
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
                                                    fullWidth
                                                />
                                            </Button>
                                        </Box>
                                    </Grid>
                                )
                            }))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Campaigns;