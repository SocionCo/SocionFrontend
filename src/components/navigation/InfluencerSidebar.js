import CampaignIcon from '@mui/icons-material/Campaign';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';



export default function SelectedListItem({ index = 1 }) {
  const [selectedIndex, setSelectedIndex] = React.useState(index);

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

  ];

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  let navigate = useNavigate();

  const handleClick = (event, number, path) => {
    handleListItemClick(event, number);
    navigate(path);
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        {
          navItems.map((item, index) => {
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
