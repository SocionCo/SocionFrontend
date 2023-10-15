import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, IconButton, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import logo from "../../assets/logos/socionLogo.png";
import React from 'react';
import Menu from '@mui/material/Menu/Menu';
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';


const SocionHeader = ({ onClick, showButton = true, showX = false, onX }) => {

    const [anchorElement, setAnchorElement] = React.useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    const handleMenuOpen = (event) => {
        setAnchorElement(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorElement(null);
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingY: 2,
            paddingX: 0,
            marginY: 1,
            marginX: 0,
            width: '100%',
            height: 50,
        }} >
            <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                    height: 50,
                    width: 'auto',
                    cursor: 'pointer'
                }}

                onClick={() => {

                    if (window.location.pathname == "/home") {
                        window.location.reload();
                    } else {
                        navigate("/home");
                    }


                }}

            />


            {showX ?
                (
                    <IconButton onClick={onX}>
                        <CloseIcon></CloseIcon>
                    </IconButton>
                ) : (<></>)
            }

            <Menu
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogout} sx={{ color: 'red' }}><LogoutIcon/> Logout</MenuItem>
            </Menu>

            {!showX && (<IconButton sx={{
                color: 'white',
                backgroundColor: 'green',
                '&:hover': { backgroundColor: 'darkgreen' },
                width: '48px',
                height: '48px'
            }}
                onClick={handleMenuOpen}
            >
                <Avatar sx={{
                    backgroundColor: 'green',
                    color: 'white',
                    width: '32px',
                    height: '32px'
                }} src="/broken-image.jpg" />
            </IconButton>)}


        </Box>
    )
}

export default SocionHeader;