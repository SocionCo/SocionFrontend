import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, IconButton, InputAdornment, Paper } from "@mui/material";
import TextField from '@mui/material/TextField';

const TalentSearchBar = ( {onChange, handleOpen, label = "Invite Talent", } ) => {

    return (
        <Paper sx={{margin: 1, display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                <TextField 
                    onChange={onChange}
                    id="outlined-basic"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        )
                    }}
                    variant="outlined"
                    sx={{p: 1, m: 1}}
                />
                <Box sx={{p:'1rem', m: '1rem'}}>
                    <Button onClick={handleOpen}>{label}</Button>
                    <IconButton>
                        <SettingsIcon></SettingsIcon>
                    </IconButton>
                </Box>
        </Paper>
    );
}

export default TalentSearchBar;