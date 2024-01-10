import { Box, Button, CircularProgress, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { useFormik } from "formik";
import * as React from 'react';
import { v4 as uuid } from 'uuid';
import * as Yup from "yup";
import { addAttachmentToCampaign, uploadAttachment } from "../../services/campaignServices";

const Input = styled('input')({
    display: 'none',
});

export default function UploadAttachmentForm({ contractId, handleClose }) {
    const [fileLink, setFileLink] = React.useState(null)
    const uploadInputRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);

    const formValidation = Yup.object().shape({
        attachmentName: Yup.string().required("Attachment Name is required")
    });

    const myForm = useFormik({
        initialValues: {
            attachmentName: "",
            reference: "",
        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const attachmentDTO = {
                attachmentName: values.attachmentName,
                contractId: contractId,
                reference: fileLink
            }
            addAttachmentToCampaign(attachmentDTO);
            handleClose();
        }
    });

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "2em", marginTop: "2em" }}>
                <Typography variant="h4" align="center" gutterBottom>New Attachment</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Attachment Name"
                            name="attachmentName"
                            value={myForm.values.attachmentName}
                            onChange={myForm.handleChange}
                            error={!!myForm.errors.attachmentName}
                            helperText={myForm.errors.attachmentName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Input
                                ref={uploadInputRef}
                                type="file"
                                accept="*"
                                id="upload-file"
                                onChange={async (event) => {
                                    setLoading(true);
                                    const unique_id = uuid();
                                    const file = event.target.files[0];
                                    const ref = await uploadAttachment(file, unique_id);
                                    setLoading(false);
                                    setFileLink(ref);
                                }}
                            />

                            {loading ?

                                (
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CircularProgress />
                                    </Box>
                                )


                                :
                                (<label htmlFor="upload-file">
                                    <Button variant="outlined" color="primary" component="span">
                                        Upload File
                                    </Button>
                                </label>)

                            }


                            {fileLink &&
                                <Button href={fileLink} target="_blank">Preview Upload</Button>
                            }
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!myForm.isValid || !fileLink}
                            onClick={myForm.submitForm}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
