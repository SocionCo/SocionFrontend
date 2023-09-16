import { useParams } from "react-router";
import UploadAttachmentModal from "../components/modals/UploadAttachmentModal";
import DraftDashboardModal from "../components/modals/DraftDashboardModal";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import SocionHeader from "../components/headers/SocionHeader";
import CampaignSummary from "../components/campaignDetails/CampaignSummary";
import { EditTab, TasksTab } from "../components/accordians/CampaignAccordian";
import UserProfile from "../components/campaignDetails/UserProfile";
import DraftsSidebar from "../components/avatar/DraftsSidebar";
import AddAttachmentAndMarkComplete from "../components/campaignDetails/AddAttachmentAndMarkComplete";
import React, { useState } from "react";
import { getContractDetailsWithId, markContractAsComplete, markContractAsIncomplete } from "../services/campaignServices";
import UploadDraftModal from "../components/modals/UploadDraftModal";
import InfluencerCampaignSummary from "../components/influencerCampaignDetails/influencerCampaignSummar";
import { getUserInformation } from "../services/influencerServices";
import InfluencerUserProfile from "../components/campaignDetails/InfluencerUserProfile";
import InfluencerDraftsSidebar from "../components/campaignDetails/InfluencerDraftsSidebar";
import LoadingIcon from "../components/loadingIcon/LoadingIcon";
import Sidebar from "../components/navigation/Sidebar.js";
import InfluencerSidebar from "../components/navigation/InfluencerSidebar";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AttachmentsTab } from "../components/accordians/CampaignAccordian";
import useMediaQuery from '@mui/material/useMediaQuery';


const isMobile = window.innerWidth <= 800 && window.innerHeight <= 600;


const InfluencerCampaignDetail = () => {
    const { contractId } = useParams();
    const [contract, setContract] = useState(null);
    const [influencerId, setInfluencerId] = useState(null);
    const [openDraftDashboard, setOpenDraftDashboard] = useState(false);
    const [openDraftUpload, setOpenDraftUpload] = useState(false);
    const [openAttachmentUpload, setOpenAttachmentUpload] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [value, setValue] = React.useState('1');



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    const handleOpenAttachment = () => {
        setOpenAttachmentUpload(true);
    }

    const handleCloseAttachment = () => {
        handleRefresh();
        setOpenAttachmentUpload(false);
    }

    const handleOpenDraftUpload = () => {
        setOpenDraftUpload(true);
    }

    const handleCloseDraftUpload = () => {
        setOpenDraftUpload(false);
    }

    const handleOpenDashboard = () => {
        setOpenDraftDashboard(true);
    }

    const handleCloseDashboard = () => {
        setOpenDraftDashboard(false);
    }

    const completeContract = async () => {
        const contractDTO = {
            id: contractId
        }
        const response = await markContractAsComplete(contractDTO);
    }

    const incompleteContract = async () => {
        const contractDTO = {
            id: contractId
        }
        const response = await markContractAsIncomplete(contractDTO);
    }

    React.useEffect(() => {
        getContractDetailsWithId(contractId)
            .then((data) => {
                setContract(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [contractId, refresh]);

    React.useEffect(() => {
        getUserInformation()
            .then((data) => {
                console.log("Printing User Informationn", data);
                setInfluencerId(data.email);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [contractId, refresh]);

    if (!contract) {
        return <LoadingIcon />
    }


    return (
        <>
            <UploadAttachmentModal
                open={openAttachmentUpload}
                handleClose={handleCloseAttachment}
                contractId={contractId}
            />

            <UploadDraftModal
                open={openDraftUpload}
                handleClose={handleCloseDraftUpload}
                contractId={contractId}
                refresh={handleRefresh}
                influencer={influencerId}
            />
            <DraftDashboardModal
                open={openDraftDashboard}
                handleClose={handleCloseDashboard}
                drafts={contract.drafts}
                contractId={contractId}
            />
            <Box sx={{ p: 1, m: 1 }}>
                <SocionHeader showButton={false} />
                <Grid container spacing={isMobile ? 0 : 2}>
                    {/* Sidebar */}
                    {!isMobile && (
                        <Grid item xs={12} md={2}>
                            <InfluencerSidebar />
                        </Grid>)}
                    {/* Main Content */}
                    <Grid item xs={12} md={isMobile ? 12 : 10}>
                        <Box sx={{ marginBottom: 2 }}>
                            <CampaignSummary contract={contract} refresh={handleRefresh} />
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                        <Tabs
                                            vvalue={true}
                                            variant="scrollable"
                                            scrollButtons
                                            allowScrollButtonsMobile
                                            onChange={handleChange}
                                            aria-label="lab API tabs example"
                                        >
                                            <Tab label="Campaign Details" value="1" />
                                            <Tab label="Talent" value="5" />
                                            <Tab label="Tasks" value="2" />
                                            <Tab label="Attachments" value="3" />
                                            <Tab label="Drafts" value="4" />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value="1">
                                        <EditTab
                                            contract={contract}
                                            refresh={handleRefresh}
                                        />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <TasksTab
                                            contract={contract}
                                            refresh={handleRefresh}
                                        />

                                    </TabPanel>
                                    <TabPanel value="3">
                                        <AttachmentsTab
                                            contract={contract}
                                            refresh={handleRefresh}
                                            handleOpen={() => setOpenAttachmentUpload(true)}
                                        />
                                    </TabPanel>
                                    <TabPanel value="4">
                                        <InfluencerDraftsSidebar
                                            dashboardOpen={handleOpenDashboard}
                                            uploadOpen={handleOpenDraftUpload}
                                            contract={contract} />
                                    </TabPanel>
                                    <TabPanel value="5">
                                        <InfluencerUserProfile contract={contract} />
                                    </TabPanel>
                                </TabContext>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );



}

const AdminCampaignDetail = () => {
    const { contractId } = useParams();
    const [contract, setContract] = useState(null);
    const [openDraftDashboard, setOpenDraftDashboard] = useState(false);
    const [openAttachmentUpload, setOpenAttachmentUpload] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleRefresh = () => {
        setTimeout(() => { setRefresh(!refresh) })
    }



    const handleOpenAttachment = () => {
        setOpenAttachmentUpload(true);
    }

    const handleCloseAttachment = () => {
        handleRefresh();
        setOpenAttachmentUpload(false);
    }

    const handleOpenDashboard = () => {
        setOpenDraftDashboard(true);
    }

    const handleCloseDashboard = () => {
        setOpenDraftDashboard(false);
    }

    const completeContract = async () => {
        const contractDTO = {
            id: contractId
        }
        const response = await markContractAsComplete(contractDTO);
    }

    const incompleteContract = async () => {
        const contractDTO = {
            id: contractId
        }
        const response = await markContractAsIncomplete(contractDTO);
    }

    React.useEffect(() => {
        getContractDetailsWithId(contractId)
            .then((data) => {
                console.log("New data recieved", data);
                setContract(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [contractId, refresh]);

    if (!contract) {
        return (<LoadingIcon />)
    }


    return (
        <>
            <UploadAttachmentModal
                open={openAttachmentUpload}
                handleClose={handleCloseAttachment}
                contractId={contractId}
            />
            <DraftDashboardModal
                open={openDraftDashboard}
                handleClose={handleCloseDashboard}
                drafts={contract.drafts}
                contractId={contractId}
            />
            <Box sx={{ p: 1, m: 1 }}>
                <SocionHeader showButton={false} />
                <Grid container spacing={isMobile ? 0 : 2}>
                    {/* Sidebar */}
                    {!isMobile && (
                        <Grid item xs={12} md={2}>
                            <Sidebar />
                        </Grid>
                    )}
                    {/* Main Content */}
                    <Grid item xs={12} md={isMobile ? 12 : 10}>
                        <Box sx={{ marginBottom: 2 }}>
                            <CampaignSummary contract={contract} refresh={handleRefresh} />
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                        <Tabs
                                            value={true}
                                            variant="scrollable"
                                            scrollButtons
                                            allowScrollButtonsMobile
                                            onChange={handleChange}
                                            aria-label="lab API tabs example"
                                        >
                                            <Tab label="Campaign Details" value="1" />
                                            <Tab label="Talent" value="5" />
                                            <Tab label="Tasks" value="2" />
                                            <Tab label="Attachments" value="3" />
                                            <Tab label="Drafts" value="4" />

                                        </Tabs>
                                    </Box>
                                    <TabPanel value="1">
                                        <EditTab
                                            contract={contract}
                                            refresh={handleRefresh}
                                        />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <TasksTab
                                            contract={contract}
                                            refresh={handleRefresh}
                                        />

                                    </TabPanel>
                                    <TabPanel value="3">
                                        <AttachmentsTab
                                            contract={contract}
                                            refresh={handleRefresh}
                                            handleOpen={() => setOpenAttachmentUpload(true)}
                                        />
                                    </TabPanel>
                                    <TabPanel value="4">
                                        <DraftsSidebar
                                            dashboardOpen={handleOpenDashboard}
                                            contract={contract} />
                                    </TabPanel>
                                    <TabPanel value="5">
                                        <UserProfile contract={contract} />
                                    </TabPanel>
                                </TabContext>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

const CampaignDetail = () => {
    const userType = localStorage.getItem('user-type');

    if (userType == "Admin" || userType == "TalentManager") {
        return <AdminCampaignDetail />
    } else {
        return <InfluencerCampaignDetail />
    }

}

export default CampaignDetail;