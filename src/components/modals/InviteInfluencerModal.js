import { Box, Modal } from "@mui/material";
import * as React from 'react';
import InviteInfluencerForm from "../forms/InviteInfluencerForm";

const InviteInfluencerModal = ( {open, handleClose } ) => { 

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
          <InviteInfluencerForm/>
        </Box>
      </Modal>
    );
}

export default InviteInfluencerModal;