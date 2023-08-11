import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as React from 'react';
import * as Yup from "yup";
import { editContract, getContractDetailsWithId } from "../../services/campaignServices";
import { getInfluencersManagedBy } from "../../services/influencerServices";






export default function EditCampaign({ agencyId, contractId }) {


    const [isFormValid, setIsFormValid] = React.useState(false);
    const [influencers,setInfluencers] = React.useState([]);
    const [contract, setContract] = React.useState(null);



    React.useEffect(() => {
        console.log("Setting contract details");
        async function setContractDetails(contractId) {
            const newDetails = await getContractDetailsWithId(contractId);
            console.log(newDetails);
            setContract(newDetails);
        }
        setContractDetails(contractId);
    }, []);


    React.useEffect(() => {
        const createRows = async () => {
            const result = await getInfluencersManagedBy();
            setInfluencers(result);
        }
        createRows();
    },[]);





    const formValidation = Yup.object().shape({
        campaignName: Yup.string().required("Campaign Name is required"),
        companyName: Yup.string().required("Company Name is required"),
        date: Yup.date().required("Date is required")
    });


   

    const myForm = useFormik({
        initialValues: {
            campaignName: contract ? contract.campaignName : "",
            description: contract ? contract.description : "",
            companyName: contract ? contract.companyName : "",
            date: contract ? contract.date : null,
            rate: contract ? contract.rate : 0,
            agencyCommission: contract ? contract.rate : 0,
            creatorRate: contract ? contract.rate : 0

        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            const userDTOs = contract.influencers;


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
                    agencyCommission: values.agencyCommission
                },

                userDTO: userDTOs
            }

            editContract(props);
            window.location.reload();

        }
    });

    React.useEffect(() => {
        if (contract) {
            myForm.setValues({
                campaignName: contract.name || myForm.values.campaignName,
                description: contract.description || myForm.values.description,
                companyName: contract.companyName || myForm.values.companyName,
                date: dayjs(contract.dueDate) || myForm.values.date,
                rate: contract.rate || myForm.values.rate,
                agencyCommission: contract.agencyCommission,
                creatorRate: contract.creatorRate
            });
        }
    }, [contract]);

    const handleDateChange = (date) => {
        myForm.setFieldValue('date', date);
    };

    React.useEffect(() => {
        setIsFormValid(myForm.isValid);
    }, [myForm.isValid]);

    return (
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
                />
            </Grid>


            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <TextField
                    sx={{ width: '100%',m: 1 }}
                    multiline
                    fullWidth
                    label="Description"
                    margin="dense"
                    name="description"
                    value={myForm.values.description}
                    onChange={myForm.handleChange}
                    error={!!myForm.errors.description}
                    helperText={myForm.errors.description}
                />
            </Grid>


            <Button
                disabled={!myForm.isValid || !isFormValid}
                onClick={myForm.submitForm}
                variant="contained"
                sx={{m:1}}
            >
                Submit
            </Button>

        </Grid>
    );
}
