import { Box, CircularProgress, Link, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from "react";
import SocionHeader from "../components/headers/SocionHeader";
import EditCampaignModal from "../components/modals/EditCampaingModal";
import NewCampaignModal from "../components/modals/NewCampaignModal";
import UploadDraftModal from "../components/modals/UploadDraftModal";
import InfluencerSidebar from "../components/navigation/InfluencerSidebar.jsx";
import Sidebar from "../components/navigation/Sidebar";
import EnhancedTable from "../components/tables/EnhancedTable";
import api from "../services/api";
import { markContractAsComplete } from "../services/campaignServices";
import { getUserInformation } from "../services/influencerServices";
import { SettingsContext } from "../util/ProtectedRoute";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



async function getRows() {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.get('/api/getActiveContracts', { headers });

        return mapApiResponseToJSONArray(response.data);
    } catch (error) {
        console.log(error);
        return [];
    }
}

function getInfluencers(influencerArray) {
    var finalString = '';
    for (let i = 0; i < influencerArray.length; i++) {
        if (i === influencerArray.length - 1) {
            finalString += influencerArray[i].fullName;
        } else {
            finalString += influencerArray[i].fullName + ", "
        }
    }
    if (finalString === '') { finalString = "N/A" }
    return finalString;
}

function mapApiObjectToJson(apiResponse) {
    return {
        id: apiResponse.id,
        name: apiResponse.name,
        influencer: getInfluencers(apiResponse.influencers),
        companyName: apiResponse.companyName,
        status: apiResponse.completed ? 'Complete' : 'Incomplete',
        date: `${apiResponse.dueDate[1]}/${apiResponse.dueDate[2]}/${apiResponse.dueDate[0].toString().substr(-2)}`,
        rate: apiResponse.rate,
        talentManagers: getInfluencers(apiResponse.talentManagers)
    };
}

function mapApiResponseToJSONArray(response) {
    let returnArray = [];
    response.forEach(element => {
        returnArray.push(mapApiObjectToJson(element));
    });
    console.log("Exit");
    return returnArray;
}



const Subheading = ({ userName }) => {
    const userType = localStorage.getItem("user-type");

    return (
        <Box sx={{
            backgroundColor: 'white',
            p: 1,
            marginBottom: 1
        }}>
            {userName ? <Typography component="h4" variant="h4" sx={{
                fontWeight: 500
            }} >Welcome back, {userName}!</Typography> : <Typography component="h4" variant="h4" >Welcome back!</Typography>}

            {(userType === "Admin" || userType === "TalentManager") ?
                (<Typography color="grey" variant="subtitle1" component="p">Let's see how your company is doing today.</Typography>) : (<Typography color="grey" variant="subtitle1" component="p">Let’s see your campaigns for this week.</Typography>)
            }
        </Box>

    )
}


const AdminDashboard = () => {
    const [rows, setRows] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [detailView, setDetailView] = React.useState(false);
    const [currentContractId, setCurrentContractId] = React.useState(null);
    const [testModalOpen, setTestModalOpen] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    const userType = localStorage.getItem("user-type");
    const settingsContext = React.useContext(SettingsContext);



    const handleTestOpen = () => {
        setTestModalOpen(true);
    }

    const handleTestClose = () => {
        setTestModalOpen(false);
    }






    const handleDetailOpen = (currentContractId) => {
        setCurrentContractId(currentContractId);
        setDetailView(true);
    }

    const handleComplete = (id) => {
        const contractDTO = {
            id: id
        }
        markContractAsComplete(contractDTO);
        window.location.reload();
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleEditOpen = () => {
        setOpenEdit(true);
    }

    const handleEditClose = () => {
        setOpenEdit(false);
    }

    const refreshRows = async () => {
        window.location.reload();
    }

    const [props, setProps] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserInformation();
            console.log("PROPSOPS", result);
            setProps(result);
        }
        fetchData();
    }, []);


    const handleDetailClose = () => {
        window.location.reload();
        console.log("Detail closing");
    }

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const createRows = async () => {
            const result = await getRows();
            setRows(result);
            setIsLoading(false);
        }
        createRows();
    }, [detailView]);


    const [color] = useState("#fff3e0");



    return (
        <Box sx={{ m: 1, p: 1 }} >
            <UploadDraftModal
                open={testModalOpen}
                handleClose={handleTestClose}
                contractId={1}
            />
            <NewCampaignModal
                open={open}
                handleClose={handleClose}
                agencyId={props ? props.agencyId : null}
                refresh={refreshRows} />
            <EditCampaignModal
                open={openEdit}
                handleClose={handleEditClose}
                agencyId={props ? props.agencyId : null}
                refresh={refreshRows}
                contractId={currentContractId}
            />
            <SocionHeader onClick={handleOpen}></SocionHeader>
            <Grid container spacing={0}>
                <Grid item xs={12} md={2}>
                    {(userType === "Admin" || userType === "TalentManager") ?
                        (<Sidebar index={0}></Sidebar>) : (<InfluencerSidebar index={0} />)
                    }
                </Grid>
                <Grid item xs={12} md={10} sx={{ height: '100%'}}>
                    {!isLoading ? (
                        <Box sx={{ m: 1 }}>
                            <Subheading userName={props ? props.firstName : null}></Subheading>
                            {!isLoading && rows.length > 0 &&
                                <EnhancedTable
                                    rows={rows}
                                    refresh={refreshRows}
                                    handleComplete={handleComplete}
                                />}

                            {!isLoading && rows.length == 0 &&  (((userType === "Admin" || userType === "TalentManager")) ?
                                (<Typography sx={{m: 1}}>
                                    Create a <Link
                                        onClick={() => {
                                            setOpen(true);
                                        }}
                                        sx={{ fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}
                                    >New Campaign</Link> to get started!
                                </Typography>) : (<Typography variant="h6" sx={{m: 1}}>
                                    No campaigns yet!
                                </Typography>))
                            }
                        </Box>

                    ) :
                        (
                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        )
                    }
                </Grid>
            </Grid>
        </Box>
    )

}

export default AdminDashboard;