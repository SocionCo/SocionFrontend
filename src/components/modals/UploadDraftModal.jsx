import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import UploadDraftForm from '../forms/UploadDraftForm';

const UploadDraftModal = ({ open, handleClose, influencer, contractId, refresh }) => {

  influencer = {
    email: influencer
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '90%', // On extra-small devices (mobile), width is 90% of the screen
      sm: 600,   // On small devices (tablets), width is 600px
      md: 400    // On medium devices (desktop), width is 400px
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto', // in case the content is too long, it allows scrolling
    maxHeight: '90%' // set a maxHeight to prevent overflow on small screens
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <UploadDraftForm
          influencer={influencer}
          contractId={contractId}
          refresh={refresh}
          handleClose={handleClose}
          influencerEmail={influencer.email}
        />
      </Box>
    </Modal>
  );
}

export default UploadDraftModal;
