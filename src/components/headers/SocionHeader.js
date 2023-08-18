import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import logo from "../../assets/logos/socionLogo.png";


const SocionHeader = ({ onClick, showButton = true, showX = false, onX}) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingY: 2,
            paddingX: 0,
            marginY: 1,
            marginX: 0,
            borderBottom: "5px solid green",
            width: '100%',
            height: 50,
        }} >
            <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                    height: 50,
                    width: 'auto'
                }} />
            {showButton ?
                (<Button onClick={onClick} color="success" variant="contained" sx={{
                    m:1,
                    height: 50
                }}>Create Campaign!</Button>) : (<></>)
            }

            {showX ?
                (
                <IconButton onClick={onX}>
                    <CloseIcon></CloseIcon>
                </IconButton>
                ) : (<></>)
            }


        </Box>
    )
}

export default SocionHeader;