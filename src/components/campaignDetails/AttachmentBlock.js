import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Link } from "@mui/material";
import Typography from '@mui/material/Typography';

export default function AttachmentBlock({attachment}) {
    const { attachmentName, reference } = attachment;
    console.log(attachment);
    return (
        <Box sx={{
            display: 'flex',
            marginBottom: 1

        }}
        >
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
        </Box>
    );
}