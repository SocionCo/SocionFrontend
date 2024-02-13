import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CampaignIcon from '@mui/icons-material/Campaign';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SecurityIcon from '@mui/icons-material/Security';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function AgencySettingsSidebar({active}) {
    const userType = localStorage.getItem("user-type");
    const navigate = useNavigate();


    const handleClick = (event, index, path) => { 
        navigate(path);
    }


    const navItems = (userType == "Admin") ? [
        {
            name: 'My Account',
            icon: <PermIdentityIcon />,
            path: '/agencySettings',
        },
        {
            name: 'Security',
            icon: <SecurityIcon />,
            path: '/agencySettings/security',
        },
        {
            name: 'Campaign Settings',
            icon: <CampaignIcon/>,
            path: '/agencySettings/campaign',
        },
        {
            name: 'Oboarding Settings',
            icon: <PeopleAltIcon/>,
            path: '/agencySettings/campaign',
        },

    ] : [
        {
            name: 'My Account',
            icon: <PermIdentityIcon />,
            path: '/agencySettings',
        },
        {
            name: 'Security',
            icon: <SecurityIcon />,
            path: '/agencySettings/security',
        },

    ];

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {navItems.map((item, index) => {
                        return (
                            <ListItemButton
                                key={index}
                                selected={active === index}
                                onClick={(event) => handleClick(event, index, item.path)}
                                sx={{
                                    borderRadius: 10,
                                    "&.Mui-selected": {
                                        backgroundColor: "#2e8b57",
                                        color: 'white',
                                        "&:hover": {
                                            backgroundColor: "#2e8b57"
                                        }
                                    },
                                    "&.Mui-focusVisible": {
                                        backgroundColor: "#2e8b57"
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', width: '24px' }}>
                                                {item.icon}
                                            </Box>
                                            <Typography sx={{ marginLeft: 2 }}>{item.name}</Typography>
                                        </Box>
                                    }
                                />
                            </ListItemButton>
                        );
                    })

                    }


                </List>
            </nav>
        </Box>
    );
}
