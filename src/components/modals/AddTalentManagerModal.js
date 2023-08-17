import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { getTalentManagersAtUsersAgency, updateTalentManagersForUser } from '../../services/agencyServices';

const AddTalentManagerModal = ({ open, handleClose, userEmail, currentTalentManagers, refresh, contractId }) => {

    const [selectedTalentManagers,setSelectedTalentManagers] = React.useState(currentTalentManagers || []);
    const [talentManagers, setTalentManagers] = React.useState([]);

    React.useEffect(() =>{
        const execute = async () => { 
            const response = await getTalentManagersAtUsersAgency(true);
            console.log("Literally every time",response);
            setTalentManagers(response);
        }
        execute();
    },[]);

    const handleSelectionChange = (event, values) => { 
        setSelectedTalentManagers(values);
    }

    const onSubmit = () => { 
        updateTalentManagersForUser(selectedTalentManagers, userEmail);
        handleClose();
    }

    

    const DropdownBox = () => {
        return (<Autocomplete
            multiple
            isOptionEqualToValue={(option, value) => option.email === value.email}
            disablePortal
            id="combo-box-demo"
            options={talentManagers}
            value={selectedTalentManagers}
            onChange={handleSelectionChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="TalentManager(s)" />}
        />);
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >   
            <Box sx={style}>
                <DropdownBox></DropdownBox>
                <Button onClick={onSubmit}>Submit</Button>
            </Box>
            

        </Modal>
    );
}

export default AddTalentManagerModal;