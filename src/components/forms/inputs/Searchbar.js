import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar({ handleChange }) {
    return (
        <TextField
            sx={{
                position: 'absolute',
                top: '-60px',  // adjust this based on the height of your TextField
                left: '0',
                zIndex: 10,
                background: 'white'
            }}
            fullWidth
            placeholder="Search..."
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />)
}