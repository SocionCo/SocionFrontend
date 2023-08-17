import { Box, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { addTaskToContract, checkOffTask, deleteTask, markTaskAsUnchecked } from "../../services/campaignServices";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import AddTaskIcon from '@mui/icons-material/AddTask';

export default function TaskSticker({ contractId, isInputTask, task, refresh, handleClose }) {
    if (isInputTask) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AssignmentIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth id="input-with-sx" variant="standard" onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        addTaskToContract(ev.target.value, contractId);
                        ev.preventDefault();
                        handleClose();
                        refresh();

                    }
                }} />
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1}}>
                {!task.taskCompleted ?
                    (<AssignmentIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />) : (<CheckCircleIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />)
                }
                <TextField fullWidth value={task.taskName} id="input-with-sx" variant="standard" InputProps={{
                    disableUnderline: true,
                }} />
            </Box>
            <Box>
                <IconButton onClick={() => { 
                            deleteTask(task);
                            refresh();
                        }}>
                    <DeleteIcon 
                        
                    />
                </IconButton>
                {!task.taskCompleted ?
                    (<IconButton onClick={() => {
                        checkOffTask(task);
                        refresh();
                    }}>
                        <CheckIcon />
                    </IconButton>) : (<IconButton onClick={() => {
                        markTaskAsUnchecked(task);
                        refresh();
                    }}>
                        <ClearIcon />
                    </IconButton>)
                    
}
            </Box>
        </Box>
    )
}