import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Button, Link } from "@mui/material";
import Typography from '@mui/material/Typography';
import { deleteAttachment } from '../../services/campaignServices';
import ConfirmActionDialogue from '../modals/ConfirmActionDialogue';
import { useState } from 'react';

export default function AttachmentBlock({ attachment, refresh }) {
    const { attachmentName, reference } = attachment;
    const [open, setOpen] = useState(false);
    const userType = localStorage.getItem('user-type');
    return (
        
        <Box sx={{
            display: 'flex',
            marginBottom: 1

        }}
        >
            <ConfirmActionDialogue
                open={open}
                onClick={() => {
                    deleteAttachment(attachment);
                    refresh();
                    setOpen(false);
                }}
                label="Are you sure you want to delete this attachment?"
                description="This action is not reversible"
                handleClose={() => setOpen(false)}
            />
            <DescriptionIcon
                sx={{
                    marginRight: .5
                }}
            />
            <Link href={reference} target="_blank">
                <Typography>
                    {attachmentName}
                </Typography>
            </Link>

            {

                userType === "Admin" && (<Link onClick={() => {
                    setOpen(true);
                }} sx={{ textDecoration: 'none', marginLeft: 1, cursor: 'pointer' }} target="_blank">
                    <Typography sx={{ color: 'red' }}>
                        -
                    </Typography>
                </Link>)}

        </Box>
    );
}