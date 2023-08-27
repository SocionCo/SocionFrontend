import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from "react";
import { reviewDraft } from "../../services/draftServices";

const DraftReview = ({ drafts }) => {
    const [status, setStatus] = useState("");
    const [comments, setComments] = useState(""); // Add this line


    const reviewedDrafts = drafts.filter(draft => draft.approvalStatus !== 'UNREVIEWED');
    const unreviewedDrafts = drafts.filter(draft => draft.approvalStatus === 'UNREVIEWED');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleUnreview = (draftDTO) => {
        reviewDraft(draftDTO, "UNREVIEWED", "");
        window.location.reload();
    }

    const handleReview = (draftDTO, comments, status) => {
        reviewDraft(draftDTO, status, comments.toUpperCase());
        window.location.reload();
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{"Reviewed Drafts (" + reviewedDrafts.length + " to review)"}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {reviewedDrafts.map((draft) => (
                        <div key={draft.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            
                            <ListItemText primary={draft.draftName + "Status: " + draft.approvalStatus} />
                            <Button onClick={() => handleUnreview(draft)}>
                                Mark as Unreviewed
                            </Button>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>{"Unreviewed Drafts (" + unreviewedDrafts.length + " to review)"}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {unreviewedDrafts.map((draft) => (
                        <div key={draft.id} >
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ width: "320px", height: "240px", overflow: "hidden", position: "relative" }}>
                                    <video src={draft.reference} controls style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        left: "50%",
                                        top: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }} />
                                </div>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'left',
                                justifyContent: 'center'
                            }}>
                                <TextField
                                    onChange={(e) => setComments(e.target.value)}
                                    label="Comments"
                                    variant="outlined"
                                    sx={{ m: 1 }}
                                />
                                <FormControl
                                    sx={{ m: 1 }}
                                    variant="outlined">

                                    <InputLabel id="review-label">Status</InputLabel>
                                    <Select
                                        labelId="review-label"
                                        value={status}
                                        onChange={handleChange}
                                        label="Review"
                                    >
                                        <MenuItem value="APPROVED">Approve</MenuItem>
                                        <MenuItem value="REJECTED">Disapprove</MenuItem>
                                    </Select>
                                </FormControl>

                            </Box>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button
                                sx={{ m: 1 }}
                                onClick={() => handleReview(draft, comments, status)}>
                                Submit
                            </Button>
                        </div>

                        </div>
                    ))}
            </AccordionDetails>
        </Accordion>
        </div >
    );
}

export default DraftReview;
