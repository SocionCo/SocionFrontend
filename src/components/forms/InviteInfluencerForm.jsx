import { Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as React from 'react';
import * as Yup from "yup";
import EmailSentPopup from "../modals/EmailSentPopup";
import { inviteInfluencerToAgency } from "../../services/agencyServices";

const InviteInfluencerForm = ({onClose, contractId}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handlePopupClose = () => {
        onClose();
        setOpen(false);
    };

    const formValidation = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
    });

    const myForm = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: formValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            if (contractId) { 
                console.log("Inviting with Contract ID, ", contractId);
            } else { 
                console.log("Inviting without contractID, ", contractId);
            }
            inviteInfluencerToAgency(values.email, contractId);
            handleClickOpen();

        }
    });



    return (
        <Stack>
            <EmailSentPopup label={"Email successfully sent to: " + myForm.values.email + "."}
                description={"The influencer has 24 hours to accept the invite and register an account."}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handlePopupClose}
            />
            <TextField
                required
                label="Email"
                margin="dense"
                name="email"
                value={myForm.values.email}
                onChange={myForm.handleChange}
                error={!!myForm.errors.email}
                helperText={myForm.errors.email}
            />

            <Stack>
                <Button onClick={myForm.submitForm}>Send Invitation</Button>
                <Typography variant="caption" component='h1'>An invitation to join your agency will be sent to the email address. The invite will expire in 24 hours.</Typography>
            </Stack>
        </Stack>
    );
}


export default InviteInfluencerForm;