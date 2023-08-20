import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Button, IconButton, Link } from "@mui/material";
import Typography from '@mui/material/Typography';
import { deleteAttachment } from '../../services/campaignServices';
import ConfirmActionDialogue from '../modals/ConfirmActionDialogue';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AttachmentBlock({ attachment, refresh }) {
    const { attachmentName, reference } = attachment;
    const [open, setOpen] = useState(false);
    const userType = localStorage.getItem('user-type');
    return (
        <>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{display: 'flex'}}>
                    <DescriptionIcon
                        sx={{
                            marginRight: .5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                    <Link href={reference} target="_blank">
                        <Typography>
                            {attachmentName}
                        </Typography>
                    </Link>
                </Box>
                <Box>
                    {
                        userType === "Admin" && (<IconButton

                            onClick={() => {
                                setOpen(true);
                            }} sx={{ display: 'flex', textDecoration: 'none', cursor: 'pointer' }} target="_blank">
                            <DeleteIcon />
                        </IconButton>)}
                </Box>
            </Box>

        </>
    );
}