import { useState } from "react";
import { Button, Dialog } from "@mui/material";
import { generateMediaKit } from "../../services/mediKitServices";



const MediaKitModal = ({ influencer, open, handleClose }) => {
    const [response, setResponse] = useState("Inish");

    const handleAPI = async () => {
        const response = await generateMediaKit({ influencerEmail: influencer});;
        setResponse(response);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <Button variant='contained' onClick={handleAPI}>Click Me</Button>
            <h6>{response}</h6>

        </Dialog>
    );
}




export default MediaKitModal;