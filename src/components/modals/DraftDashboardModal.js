import { Box, Dialog, Slide } from "@mui/material";
import * as React from 'react';
import DraftReview from "../forms/DraftReview";
import SocionHeader from "../headers/SocionHeader";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DraftDashboardModal = ({ open, handleClose, drafts }) => {



  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Box>
      <SocionHeader showButton={false} showX={true} onX={handleClose}  />
        <DraftReview drafts={drafts} />
      </Box>
    </Dialog>
  );
}

export default DraftDashboardModal;