import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';


export default function SelectedListItem( {index = 1} ) {
  const [selectedIndex, setSelectedIndex] = React.useState(index);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  let navigate = useNavigate();

  const handleClick = (event, number, path) => { 
    handleListItemClick(event,number);
    navigate(path);
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleClick(event, 0, "/home" )}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleClick(event, 1, "/campaigns")}
        >
          <ListItemText primary="Campaigns" />
        </ListItemButton>
        </List>
    </Box>
  );
}
