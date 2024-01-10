import { Button, CircularProgress, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box, styled } from '@mui/system';
import { useFormik } from "formik";
import * as React from 'react';
import { v4 as uuid } from 'uuid';
import * as Yup from "yup";
import uploadVideo from "../../aws/uploadVideo";
import { addDraftToCampaign } from "../../services/draftServices";
import LinearWithValueLabel from "../loadingIcon/LoadingBar";

const Input = styled('input')({
    display: 'none',
});

export default function UploadDraftForm({ influencerEmail, contractId, refresh, handleClose }) {
    const [videoPreview, setVideoPreview] = React.useState(null)
    const uploadInputRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [loadingProgress, setLoadingProgress] = React.useState(0);

    const onProgress = (newProgress) => {
        console.log("Setting new progress to: " + newProgress);
        setLoadingProgress(newProgress);
    }

    const formValidation = Yup.object().shape({
        draftName: Yup.string().required("Campaign Name is required")
    });

    const myForm = useFormik({
        initialValues: {
            draftName: "",
            reference: "",
            description: ""
        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            console.log("Email", influencerEmail);

            const draftDTO = {
                draftName: values.draftName,
                contractId: contractId,
                submittedByEmail: influencerEmail,
                reference: videoPreview,
                description: values.description
            }
            const response = await addDraftToCampaign(draftDTO);

            if (response) {
                refresh();
                handleClose();
            }

        }
    });

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "2em", marginTop: "2em" }}>
                <Typography variant="h4" align="center" gutterBottom>Create New Draft</Typography>
                {loading ?

                    (
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LinearWithValueLabel progress={loadingProgress} />
                        </Box>
                    )


                    :

                    (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                            <label htmlFor="upload-video">
                                <Button
                                    variant="outlined"
                                    color="primary" component="span">
                                    {videoPreview ? "Change Video" : "Upload Video"}
                                </Button>
                            </label>
                        </Box>)

                }
                <Grid container spacing={3}>
                    {videoPreview && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Draft Name"
                                    name="draftName"
                                    value={myForm.values.draftName}
                                    onChange={myForm.handleChange}
                                    error={!!myForm.errors.draftName}
                                    helperText={myForm.errors.draftName}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={myForm.description}
                                    name='description'
                                    label='Draft Description'
                                    onChange={myForm.handleChange}
                                    error={!!myForm.errors.description}
                                    helperText={myForm.errors.description}
                                    inputProps={{ maxLength: 1000 }}
                                    multiline
                                    fullWidth
                                />
                            </Grid>
                        </>)}
                    <Grid item xs={12}>
                        <Input
                            ref={uploadInputRef}
                            type="file"
                            accept="video/mp4,video/x-m4v,video/*"
                            id="upload-video"
                            onChange={async (event) => {
                                setVideoPreview(null);
                                setLoading(true);
                                const unique_id = uuid();
                                const file = event.target.files[0];
                                const ref = await uploadVideo(file, unique_id, onProgress);
                                setLoading(false);
                                setVideoPreview(ref);
                            }}
                        />



                        {videoPreview &&
                            <video width="100%" controls style={{ marginTop: "1em" }}>
                                <source src={videoPreview} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        }
                    </Grid>





                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!myForm.isValid || !videoPreview}
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
