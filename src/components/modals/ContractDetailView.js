import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';
import { useState } from 'react';
import { getContractDetailsWithId, markContractAsComplete, markContractAsIncomplete } from '../../services/campaignServices';
import CampaignAccordian from '../accordians/CampaignAccordian';
import DraftsSidebar from '../avatar/DraftsSidebar';
import AddAttachmentAndMarkComplete from '../campaignDetails/AddAttachmentAndMarkComplete';
import CampaignSummary from '../campaignDetails/CampaignSummary';
import UserProfile from '../campaignDetails/UserProfile';
import SocionHeader from '../headers/SocionHeader';
import DraftDashboardModal from './DraftDashboardModal';
import UploadAttachmentModal from './UploadAttachmentModal';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContractDetailView({ contractId, open, handleClose }) {
    const [contract, setContract] = useState(null);
    const [openDraftDashboard, setOpenDraftDashboard] = useState(false);
    const [openAttachmentUpload, setOpenAttachmentUpload] = useState(false);

    const handleOpenAttachment = () => {
        setOpenAttachmentUpload(true);
    }

    const handleCloseAttachment = () => {
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
            id : contractId
        }
        const response = await markContractAsComplete(contractDTO);
    }

    const incompleteContract = async () => { 
        const contractDTO = { 
            id : contractId
        }
        const response = await markContractAsIncomplete(contractDTO);
    }

    React.useEffect(() => {
        if (open) {
            getContractDetailsWithId(contractId)
                .then((data) => {
                    setContract(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [contractId, open]);

    if (!contract) {
        return null;
    }


    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <UploadAttachmentModal
                open={openAttachmentUpload}
                handleClose={handleCloseAttachment}
                contractId={contract.id}
            />
            <DraftDashboardModal
                open={openDraftDashboard}
                handleClose={handleCloseDashboard}
                drafts={contract.drafts}
            />
            <Box sx={{ paddingX: 1 }}>
                <SocionHeader showButton={false} showX={true} onX={handleClose} />
                <Grid container spacing={2} >
                    <Grid xs={9}>
                        <Box sx={{ marginBottom: 1 }}>
                            <CampaignSummary contract={contract} />
                        </Box>
                        <CampaignAccordian contract={contract} />
                    </Grid>
                    <Grid xs={3}>
                        <Grid container spacing={2} direction='column' sx={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Grid sx={{ width: '100%' }}><UserProfile contract={contract} /></Grid>
                            <Grid sx={{ width: '100%' }} ><DraftsSidebar
                                dashboardOpen={handleOpenDashboard}
                                contract={contract} /></Grid>
                            <Grid sx={{ width: '100%' }}>
                                { !contract.completed ? 
                                (<AddAttachmentAndMarkComplete 
                                    addAttachmentAction={handleOpenAttachment}
                                    markCompleteAction={completeContract}
                                />) : (
                                    <AddAttachmentAndMarkComplete 
                                    addAttachmentAction={handleOpenAttachment}
                                    markCompleteAction={incompleteContract}
                                    completed={contract.completed}
                                    />
                                    )
                                
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
}
