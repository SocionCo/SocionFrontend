import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import UploadAttachmentForm from '../forms/UploadAttachmentForm';

const UploadAttachmentModal = ( {open, handleClose, influencer, contractId, refresh} ) => { 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UploadAttachmentForm
            contractId={contractId}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    );
}

export default UploadAttachmentModal;