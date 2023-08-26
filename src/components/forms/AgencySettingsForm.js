import { Button, FormControl, FormHelperText, FormLabel, Grid, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as React from 'react';
import * as Yup from "yup";
import { SettingsContext } from "../../util/ProtectedRoute";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";






function AgencyNameForm() {

    const agencySettings = React.useContext(SettingsContext);



    const formValidation = Yup.object().shape({
        agencyName: Yup.string().required("Campaign Name is required"),
    });




    const myForm = useFormik({
        initialValues: {
            agencyName: "Default"
        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            console.log("Submitted", values);

        }
    });

    React.useEffect(() => {
        if (agencySettings) {
            myForm.setValues({
                agencyName: agencySettings.name || myForm.values.agencyName
            });
        }
    }, [agencySettings]);


    return (
        <Grid container>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                    sx={{ width: '100%', m: 1 }}
                    required
                    label="Agency Name"
                    margin="dense"
                    name="agencyName"
                    value={myForm.values.agencyName}
                    onChange={myForm.handleChange}
                    error={!!myForm.errors.agencyName}
                    helperText={myForm.errors.agencyName}
                />
            </Grid>

            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    disabled={!myForm.isValid}
                    onClick={myForm.submitForm}
                    variant="contained"
                    sx={{ m: 1 }}
                >
                    Change Name
                </Button>
            </Grid>
        </Grid >
    );
}

function OnePagerSettings() {

    const agencySettings = React.useContext(SettingsContext);



    const formValidation = Yup.object().shape({
        includeTasks: Yup.boolean().required()
    });




    const myForm = useFormik({
        initialValues: {
            includeTasks: false
        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            console.log("Submitted", values);

        }
    });

    React.useEffect(() => {
        if (agencySettings) {
            myForm.setValues({
                includeTasks: agencySettings.includeTasks || myForm.values.includeTasks,
            });
        }
    }, [agencySettings]);

    return (
        <Grid container>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FormControl error={!!myForm.errors.includeTasks}>
                    <FormLabel id="demo-radio-buttons-group-label">Include Tasks in One-Pager?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={false}
                        name="includeTasks"
                        value={myForm.values.includeTasks}
                        onChange={myForm.handleChange}

                    >
                        <Stack direction='row'>
                            <FormControlLabel value={true} control={<Radio />} label="Include" />
                            <FormControlLabel value={false} control={<Radio />} label="Don't Include" />
                        </Stack>
                    </RadioGroup>
                    <FormHelperText>{myForm.errors.includeTasks}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    disabled={!myForm.isValid}
                    onClick={myForm.submitForm}
                    variant="contained"
                    sx={{ m: 1 }}
                >
                    Update One Pager Settings
                </Button>
            </Grid>
        </Grid>
    );
}



export default function AgencySettingsForm() {
    return (
        <>
            <AgencyNameForm />
            <OnePagerSettings />
        </>

    )
}