import { Button, Dialog, Grid, IconButton, InputAdornment, LinearProgress, Paper, TextField, Typography, setRef } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as React from 'react';
import * as Yup from "yup";
import { addContractFieldToContract, editContract, getContractDetailsWithId, removeContractFieldFromContract } from "../../services/campaignServices";
import { getInfluencersManagedBy } from "../../services/influencerServices";
import EditIcon from '@mui/icons-material/Edit';
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from "react-bootstrap";


// Takes [{fieldName: 'example', description: 'example description', compactName: 'example description'}] and returns {compactName: ""}
export function formatContractFieldArray(contractFieldArray) {
    const returnObject = {};

    contractFieldArray.forEach((contractField) => {
        var { compactName, fieldDescription } = contractField;
        if (!fieldDescription) { fieldDescription = ""; }
        returnObject[compactName] = fieldDescription;

    });
    return returnObject;
}


export default function EditCampaign({ agencyId, contractId, refresh }) {


    const [isFormValid, setIsFormValid] = React.useState(false);
    const [influencers, setInfluencers] = React.useState([]);
    const [contract, setContract] = React.useState(null);
    const [editMode, setEditMode] = React.useState(false);
    const [manageContractFields, setManageContractFields] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [refreshBool, setRefreshBool] = React.useState(false);



    const handleRefresh = () => {
        setRefreshBool(!refreshBool);
    }

    React.useEffect(() => {
        async function setContractDetails(contractId) {
            const newDetails = await getContractDetailsWithId(contractId);
            console.log("newDetails", newDetails);
            setContract(newDetails);
        }
        setContractDetails(contractId);
    }, [refreshBool]);


    React.useEffect(() => {
        const createRows = async () => {
            const result = await getInfluencersManagedBy();
            setInfluencers(result);
        }
        createRows();
    }, []);


    const flexStyles = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }


    const formValidation = Yup.object().shape({
        campaignName: Yup.string().required("Campaign Name is required"),
        companyName: Yup.string().required("Company Name is required"),
        date: Yup.date().required("Date is required")
    });

    const secondaryFormValidation = Yup.object().shape({ fieldToAdd: Yup.string().required("Field Name is required") });

    const secondaryForm = useFormik({
        initialValues: {
            fieldToAdd: ""
        },
        validationSchema: secondaryFormValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const response = await addContractFieldToContract(contract.id, values.fieldToAdd);
            setDialogOpen(false);
            resetFormValues();
            handleRefresh();
        }

    })


    const myForm = useFormik({
        initialValues: {
            ... (contract ? formatContractFieldArray(contract.contractFields) : {}),
            campaignName: contract ? contract.campaignName : "",
            description: contract ? contract.description : "",
            companyName: contract ? contract.companyName : "",
            date: contract ? contract.date : "",
            rate: contract ? contract.rate : 0,
            agencyCommission: contract ? contract.rate : 0,
            creatorRate: contract ? contract.rate : 0,

        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const userDTOs = contract.influencers;

            const contractFields = [];
            contract.contractFields.forEach((contractField) => {
                const newField = {
                    fieldName: contractField.fieldName,
                    fieldDescription: myForm.values[contractField.compactName],
                    compactName: contractField.compactName
                }

                contractFields.push(newField);
            });

            console.log("Return Contract Fields Array: ", contractFields);

            const props = {
                contractDTO: {
                    id: contractId,
                    agency: {
                        id: agencyId
                    },
                    name: values.campaignName,
                    description: values.description,
                    rate: values.rate,
                    dueDate: values.date,
                    companyName: values.companyName,
                    creatorRate: values.creatorRate,
                    agencyCommission: values.agencyCommission,
                    contractFields: contractFields,
                    creationDate: contract.creationDate
                },

                userDTO: userDTOs
            }

            const response = await editContract(props);
            setEditMode(false);
            handleRefresh();

        }
    });



    React.useEffect(() => {
        resetFormValues();
        console.log("Reset form values to: ", myForm.values);
    }, [contract]);


    const resetFormValues = () => {
        if (contract) {
            myForm.setValues({
                ... (formatContractFieldArray(contract.contractFields)),
                campaignName: contract.name || "",
                description: contract.description || "",
                companyName: contract.companyName || "",
                date: contract.dueDate ? dayjs(contract.dueDate) : "",
                rate: contract.hasOwnProperty('rate') ? contract.rate : 0,
                agencyCommission: contract.hasOwnProperty('agencyCommission') ? contract.agencyCommission : 0,
                creatorRate: contract.hasOwnProperty('creatorRate') ? contract.creatorRate : 0,

            });
        }
    }

    const handleDateChange = (date) => {
        myForm.setFieldValue('date', date);
    };

    React.useEffect(() => {
        setIsFormValid(myForm.isValid);
    }, [myForm.isValid]);






    if (!contract) {
        return (<LinearProgress />);
    }


    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                    handleRefresh();
                }}
            >
                <Stack sx={{ m: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 1 }}>
                        <Typography variant='h6'>Add New Fields</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 1 }}>
                        <TextField
                            sx={{ m: 1 }}
                            label="New Field Name"
                            name="fieldToAdd"
                            value={secondaryForm.values.fieldToAdd}
                            onChange={secondaryForm.handleChange}
                            error={!!secondaryForm.errors.fieldToAdd}
                            helperText={secondaryForm.errors.fieldToAdd}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1}}>
                        <Button onClick={secondaryForm.submitForm}>Add Field</Button>
                    </Box>
                </Stack>


            </Dialog>
            <Dialog
                open={manageContractFields}
                onClose={() => {
                    setManageContractFields(false);
                    handleRefresh();
                }}
            >
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='h6' gutterBottom>Custom Fields</Typography>
                    </Box>

                    <Stack>
                        <Box sx={{ marginBottom: 1 }}>
                            {contract.contractFields.length > 0 ? (
                                contract.contractFields.map((element) => (
                                    <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
                                        <Typography>{element.fieldName}</Typography>
                                        <IconButton onClick={async () => {
                                            await removeContractFieldFromContract(contract.id, element.id);
                                            handleRefresh();
                                        }} size="small">
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                ))
                            ) : (
                                <Typography>No Custom Fields</Typography>
                            )}
                        </Box>
                        <Typography variant='caption'>Fields edited here only apply to this campaign.</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                onClick={() => setDialogOpen(true)}>Add Campaign Field
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Dialog>
            <Grid container>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        sx={{ width: '100%', m: 1 }}
                        required
                        label="Campaign Name"
                        margin="dense"
                        name="campaignName"
                        value={myForm.values.campaignName}
                        onChange={myForm.handleChange}
                        error={!!myForm.errors.campaignName}
                        helperText={myForm.errors.campaignName}
                        disabled={!editMode}
                    />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        sx={{ width: '100%', m: 1 }}
                        required
                        label="Company Name"
                        margin="dense"
                        name="companyName"
                        value={myForm.values.companyName}
                        onChange={myForm.handleChange}
                        error={!!myForm.errors.companyName}
                        helperText={myForm.errors.companyName}
                        disabled={!editMode}
                    />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{
                            marginTop: 1,
                            width: '100%',
                            m: 1
                        }}
                            required
                            margin='dense'
                            name="date"
                            label="Due Date *"
                            value={myForm.values.date}
                            onChange={handleDateChange}
                            error={!!myForm.errors.date}
                            helperText={myForm.errors.date}
                            disabled={!editMode}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField

                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        margin="dense"
                        name="rate"
                        label="Booking Rate"
                        type="number"
                        value={myForm.values.rate}
                        onChange={myForm.handleChange}
                        error={!!myForm.errors.rate}
                        helperText={myForm.errors.rate}
                        sx={{
                            marginBottom: 1,
                            width: '100%',
                            m: 1
                        }}
                        disabled={!editMode}
                    />
                </Grid>



                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        margin="dense"
                        name="agencyCommission"
                        label="Agency Comission"
                        type="number"
                        value={myForm.values.agencyCommission}
                        onChange={myForm.handleChange}
                        error={!!myForm.errors.agencyCommission}
                        helperText={myForm.errors.agencyCommission}
                        sx={{
                            marginBottom: 1,
                            width: '100%',
                            m: 1
                        }}
                        disabled={!editMode}
                    />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        margin="dense"
                        name="creatorRate"
                        label="Creator Rate"
                        type="number"
                        value={myForm.values.creatorRate}
                        onChange={myForm.handleChange}
                        error={!!myForm.errors.creatorRate}
                        helperText={myForm.errors.creatorRate}
                        sx={{
                            marginBottom: 1,
                            width: '100%',
                            m: 1
                        }}
                        disabled={!editMode}
                    />
                </Grid>

                {contract.contractFields.map((contractField) => {
                    return (<Grid item xs={4} key={contractField.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TextField
                            margin="dense"
                            name={contractField.compactName}
                            label={contractField.fieldName}
                            value={myForm.values[contractField.compactName]}
                            onChange={myForm.handleChange}
                            error={!!myForm.errors[contractField.compactName]}
                            helperText={myForm.errors[contractField.compactName]}
                            sx={{
                                marginBottom: 1,
                                width: '100%',
                                m: 1
                            }}
                            disabled={!editMode}
                        />
                    </Grid>);
                })}


                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <TextField
                        sx={{ width: '100%', m: 1 }}
                        multiline
                        fullWidth
                        label="Description"
                        margin="dense"
                        name="description"
                        value={myForm.values.description}
                        onChange={myForm.handleChange}
                        error={!!myForm.errors.description}
                        helperText={myForm.errors.description}
                        disabled={!editMode}
                    />
                </Grid>



                {
                    editMode ? (
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Button
                                onClick={() => {
                                    setManageContractFields(true)
                                }}
                                variant='outlined'
                                sx={{ m: 1 }}
                            >
                                Manage Fields
                            </Button>


                            <Box>
                                <Button
                                    disabled={!myForm.isValid || !isFormValid}
                                    onClick={myForm.submitForm}
                                    variant="contained"
                                    sx={{ m: 1 }}
                                >
                                    Save Changes
                                </Button>

                                <Button
                                    onClick={() => {
                                        setEditMode(false);
                                        handleRefresh();
                                        resetFormValues();
                                    }}
                                    variant="contained"
                                    color='grey'
                                    sx={{ m: 1 }}
                                >
                                    Cancel
                                </Button>
                            </Box>




                        </Box>

                    ) : (
                        <Box sx={flexStyles}>
                            <Button sx={{ m: 1 }} variant='contained' color='grey' onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                setEditMode(true)
                            }}>
                                Edit
                            </Button>
                        </Box>


                    )


                }



            </Grid>
        </>
    );
}
