import { Chip, Paper, Stack } from "@mui/material";

const SubHeading = () => { 
   return (<
    Stack direction='row'>
        <Paper>
          <Chip label="success" color="success" variant="outlined" />
        </Paper>
    </Stack>);
}

export default SubHeading;