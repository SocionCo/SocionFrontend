import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton, Slide } from "@mui/material";
import * as React from 'react';
import AdminVideoPlayer from "../videoPlayer/AdminVideoPlayer";
import { ThemeProvider } from 'react-bootstrap';
import { createTheme } from '@mui/system';
import styled from '@emotion/styled';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DraftDashboardModal = ({ open, handleClose, drafts, contractId }) => {

  return (

    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Box sx={{backgroundColor: '#00a152'}}>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Box>
        <AdminVideoPlayer drafts={drafts} handleClose={handleClose} contractId={contractId}/>
      </Box>
    </Dialog>
  );
}

export default DraftDashboardModal;