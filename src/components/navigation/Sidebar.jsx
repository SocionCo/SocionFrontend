import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Typography } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SettingsIcon from '@mui/icons-material/Settings';


export default function SelectedListItem({ index = 1 }) {
  const [selectedIndex, setSelectedIndex] = React.useState(index);
  const userType = localStorage.getItem('user-type');
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/home',
      adminOnly: false,
    },
    {
      name: 'Campaigns',
      icon: <CampaignIcon />,
      path: '/campaigns',
      adminOnly: false,
    },
    {
      name: 'Talent',
      icon: <EmojiPeopleIcon />,
      path: '/talent',
      adminOnly: false,
    },
    {
      name: 'Team',
      icon: <GroupsIcon />,
      path: '/team',
      adminOnly: true,
    },
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      path: '/agencySettings',
      adminOnly: true,
    }

  ];

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleClick = (event, index, path) => {
    handleListItemClick(event, index);
    navigate(path);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };


  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        {
          navItems.map((item, index) => {
            if (item.adminOnly && userType !== 'Admin') {
              return null;
            }
            return (
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
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
    </Box>
  );
}