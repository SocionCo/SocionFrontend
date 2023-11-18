import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton, Slide } from "@mui/material";
import * as React from 'react';
import AdminVideoPlayer from "../videoPlayer/VideoPlayer";
import { ThemeProvider } from 'react-bootstrap';
import { createTheme } from '@mui/system';
import styled from '@emotion/styled';
import VideoPlayer from '../videoPlayer/VideoPlayer';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DraftDashboardModal = ({ open, handleClose, drafts, contractId, refresh }) => {

  const userType = localStorage.getItem('user-type');


  return (

    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {userType === "Admin" || userType === "TalentManager" ?
        (
          <VideoPlayer isForAdmin={true} drafts={drafts} handleClose={handleClose} contractId={contractId} refreshOuterPage={refresh} />
        ) :
        (
          <VideoPlayer
            refreshOuterPage={refresh}
            draft={drafts}
            handleClose={handleClose}
            contractId={contractId}
          />
        )

      }


    </Dialog>
  );
}

export default DraftDashboardModal;