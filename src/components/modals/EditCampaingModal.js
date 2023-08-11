import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useState } from 'react';
import { getContractDetailsWithId } from '../../services/campaignServices';
import EditCampaign from '../forms/EditCampaign';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContractDetailView({ contractId, open, handleClose }) {
  const [contract, setContract] = useState(null);
  const [openDraftDashboard, setOpenDraftDashboard] = useState(false);

  const handleOpenDashboard = () => {
    setOpenDraftDashboard(true);
  }

  const handleCloseDashboard = () => {
    setOpenDraftDashboard(false);
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton 
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <EditCampaign
        contractId={contractId}
      />
    </Dialog>
  );
}
