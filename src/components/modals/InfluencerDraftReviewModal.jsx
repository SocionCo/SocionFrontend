import { Box, Dialog, Slide, Typography } from "@mui/material";
import * as React from 'react';
import DraftReview from "../forms/DraftReview";
import SocionHeader from "../headers/SocionHeader";
import { Modal } from "bootstrap";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InfluencerDraftReviewModal = ({ open, handleClose, draft }) => {


    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <Box sx={{display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center', m: 1, p: 1}}>
                <Typography variant='h4'>Draft Review for: {draft.draftName}</Typography>
                {draft.reference &&
                    <video width="50%" controls style={{ marginTop: "1em", padding:5 }}>
                        <source src={draft.reference} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                }
                 {
                 draft.approvalStatus === "APPROVED" ? 
                 (<Typography sx={{color: 'green'}} variant='h6'>Approval Status: {draft.approvalStatus}</Typography>) : 
                 (<Typography sx={{color: 'red'}} variant='h6'>Approval Status: {draft.approvalStatus}</Typography>)
                 }
                 <Typography variant='subheadline'>Notes: {draft.approvalNotes}</Typography>
            </Box>
        </Dialog>
    );
}

export default InfluencerDraftReviewModal;