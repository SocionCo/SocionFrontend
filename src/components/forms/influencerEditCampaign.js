import { Button, Grid, InputAdornment, LinearProgress, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as React from 'react';
import * as Yup from "yup";
import { editContract, getContractDetailsWithId } from "../../services/campaignServices";
import { getInfluencersManagedBy } from "../../services/influencerServices";
import styled from "@emotion/styled";
import { formatContractFieldArray } from "./EditCampaign";






export default function InfluencerEditCampaign({ agencyId, contractId, refresh }) {


    const [isFormValid, setIsFormValid] = React.useState(false);
    const [influencers, setInfluencers] = React.useState([]);
    const [contract, setContract] = React.useState(null);
    const [refreshBool, setRefreshBool] = React.useState(false);



    const handleRefresh = () => {
        setRefreshBool(!refreshBool);
    }



    React.useEffect(() => {
        console.log("Setting contract details");
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





    const formValidation = Yup.object().shape({
        campaignName: Yup.string().required("Campaign Name is required"),
        companyName: Yup.string().required("Company Name is required"),
        date: Yup.date().required("Date is required")
    });



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
        validateOnBlur: true
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
        <Grid container>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                    sx={{ width: '100%', m: 1 }}
                    required
                    disabled
                    label="Campaign Name"
                    margin="dense"
                    name="campaignName"
                    value={myForm.values.campaignName}
                    onChange={myForm.handleChange}
                    error={!!myForm.errors.campaignName}
                    helperText={myForm.errors.campaignName}
                />
            </Grid>

            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                    sx={{ width: '100%', m: 1 }}
                    required
                    disabled
                    label="Company Name"
                    margin="dense"
                    name="companyName"
                    value={myForm.values.companyName}
                    onChange={myForm.handleChange}
                    error={!!myForm.errors.companyName}
                    helperText={myForm.errors.companyName}
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
                        disabled
                        margin='dense'
                        name="date"
                        label="Due Date *"
                        value={myForm.values.date}
                        onChange={handleDateChange}
                        error={!!myForm.errors.date}
                        helperText={myForm.errors.date}
                    />
                </LocalizationProvider>
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
                        disabled
                    />
                </Grid>);
            })}



            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <TextField
                    sx={{
                        width: '100%', m: 1
                    }}
                    multiline
                    fullWidth
                    disabled
                    label="Description"
                    margin="dense"
                    name="description"
                    value={myForm.values.description}
                    onChange={myForm.handleChange}
                    error={!!myForm.errors.description}
                    helperText={myForm.errors.description}
                />
            </Grid>



        </Grid>
    );
}
