import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { updateInfluencers } from '../../services/campaignServices';
import { getInfluencersManagedBy } from '../../services/influencerServices';

const AddInfluencerModal = ({ open, handleClose, agencyId, refresh, existingInfluencers, contractId }) => {

    const onSubmit = () => { 
        updateInfluencers(selectedInfluencers,contractId);
        window.location.reload();
    }

    const handleSelectionChange = (event, newValue) => {
        setSelectedInfluencers(newValue);
      };

    const [influencers, setInfluencers] = React.useState([]);
    const [selectedInfluencers, setSelectedInfluencers] = React.useState([])

    const mapInfluencersToOptions = (influencers) => { 
        return influencers.map (influencer => {
            return (
                {
                    label: influencer.fullName,
                    email: influencer.email
                }
            );
        });
    }

    React.useEffect(() => {
        if (open) {
            console.log("Ur dumb this is the one");
            getInfluencersManagedBy()
                .then((data) => {
                    setInfluencers(data);
                    const newbies = (mapInfluencersToOptions(existingInfluencers));
                    setSelectedInfluencers(newbies);
                })
                .catch((error) => {
                    console.error(error);
                });
            
        }

    }, [open, existingInfluencers]);

    

    const DropdownBox = () => {
        return (<Autocomplete
            multiple
            isOptionEqualToValue={(option, value) => option.email === value.email}
            disablePortal
            id="combo-box-demo"
            options={influencers}
            value={selectedInfluencers}
            onChange={handleSelectionChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Influencer(s)" />}
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

export default AddInfluencerModal;