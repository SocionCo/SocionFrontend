import { Box, Button, ButtonBase, Dialog, Grid, LinearProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import FullSettingsSidebar from "./agencySettingsComponents/FullSettingsSidebar"
import { addContractFieldToAgency, getAgencySettings, removeContractFieldFromAgency } from "../../services/agencyServices";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function CampaignSettings() {

    const [contractFields, setContractFields] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    React.useEffect(() => {
        const apiCall = async () => {
            const response = await getAgencySettings();
            setContractFields(response.contractFields || []);

        }
        apiCall();
    }, [refresh])

    const formValidation = Yup.object().shape({
        newName: Yup.string().required("Name is required"),
    });

    const myForm = useFormik({
        initialValues: {
            newName: ""

        },
        validationSchema: formValidation,
        onSubmit: async () => {
            const response = await addContractFieldToAgency(myForm.values.newName);
            console.log("Finally respondin", response);
            setDialogOpen(false);
            handleRefresh();


        }
    });

    const handleClose = () => {
        setDialogOpen(false);
        myForm.resetForm();
        handleRefresh();
    }

    const handleRemove = async (id) => { 
        console.log("Removing, ", id);
        const response = await removeContractFieldFromAgency(id);
        console.log("Response not working", response);
        handleRefresh();
    }


    if (!contractFields) {
        return (
            <LinearProgress />
        )
    }


    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
            >
                <Stack sx={{ m: 3 }}>
                    <Typography variant='h6'>Add New Default Campaign Fields</Typography>
                    <TextField
                        sx={{ m: 3}}
                        label="New Field Name"
                        name="newName"
                        value={myForm.values.newName}
                        onChange={myForm.handleChange}
                        error={!!myForm.errors.newName}
                        helperText={myForm.errors.newName}
                    />

                    <Button onClick={myForm.submitForm}>Add Field</Button>
                </Stack>


            </Dialog>
            <FullSettingsSidebar
                currentIndex={2}
                mainPage={
                    <>
                        <Paper elevation={2} sx={{ p: 2 }}>
                            <Typography variant='h6' gutterBottom>Campaign Fields</Typography>

                            <Stack>
                                <Box sx={{ marginBottom: 1 }}>
                                    {contractFields.length > 0 ? (
                                        contractFields.map((element) => (
                                            <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
                                                <Typography>{element.fieldName}</Typography>
                                                <IconButton onClick={() => handleRemove(element.id)} size="small">
                                                    <CloseIcon />
                                                </IconButton>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography>No Custom Fields</Typography>
                                    )}
                                </Box>
                                <Typography variant='caption'>Adding or removing campaign fields will cause all campaigns from this point forward to be automatically generated with the above fields.</Typography>
                                <Button 
                                sx={{margin: 'auto'}}
                                onClick={() => setDialogOpen(true)}>Add Contract Field</Button>
                            </Stack>
                        </Paper>
                    </>


                }
            />
        </>

    );
}