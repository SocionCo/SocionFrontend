import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from "formik";
import * as React from 'react';
import * as Yup from "yup";
import { createNewContract } from "../../services/campaignServices";
import { getInfluencersManagedBy } from "../../services/influencerServices";
import DropdownSelect from "./inputs/DropdownSelect";






export default function App( { agencyId, refresh } ) {

    let [currentDropdownSelection, setCurrentDropdownSelection] = React.useState([]);

    const [isFormValid, setIsFormValid] = React.useState(false);
    const [influencers, setInfluencers] = React.useState([]);

    const onSelectionChange = (newValue) => { 
        setCurrentDropdownSelection(newValue);
    }

    
    React.useEffect( ()=> {
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
            campaignName: "",
            companyName: "",
            date: null,

        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const userDTOs = currentDropdownSelection.map(influencer => ({
                email: influencer.email
              }));


            const props = { 
                contractDTO: { 
                    agency: { 
                        id : agencyId
                    },
                    name : values.campaignName,
                    dueDate : values.date,
                    companyName : values.companyName
                }, 

                userDTO: userDTOs
            }

            const response = await createNewContract(props);
            refresh();
            
        }
    });

    const handleDateChange = (date) => {
        myForm.setFieldValue('date', date);
    };

    React.useEffect(() => {
        setIsFormValid(myForm.isValid);
      }, [myForm.isValid, currentDropdownSelection]);




    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography component='h6' variant="h6">Create New Campaign</Typography>
            </Box>
            <TextField
                required
                label="Campaign Name"
                margin="dense"
                name="campaignName"
                value={myForm.values.campaignName}
                onChange={myForm.handleChange}
                error={!!myForm.errors.campaignName}
                helperText={myForm.errors.campaignName}
            />


            <TextField
                required
                label="Company Name"
                margin="dense"
                name="companyName"
                value={myForm.values.companyName}
                onChange={myForm.handleChange}
                error={!!myForm.errors.companyName}
                helperText={myForm.errors.companyName}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{
                    marginY: 1
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


            <Box sx={{
                marginBottom : 1
            }}>
                <DropdownSelect
                        options = {influencers}
                        label = "Influencers"
                        onSelectionChange={onSelectionChange}
                />
            </Box>


            <Button
                disabled={!myForm.isValid || !isFormValid}
                onClick={myForm.submitForm}
                variant="contained"
            >
                Submit
            </Button>

        </Box>
    );
}
