import { Box, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { addTaskToContract, checkOffTask, deleteTask, markTaskAsUnchecked } from "../../services/campaignServices";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import AddTaskIcon from '@mui/icons-material/AddTask';
import React from "react";

export default function TaskSticker({ contractId, isInputTask, task, refresh, handleClose }) {
    const [taskInput, setTaskInput] = React.useState("");

    if (isInputTask) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                <AssignmentIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                    fullWidth
                    id="input-with-sx"
                    variant="standard"
                    value={taskInput} // Set value
                    onChange={(e) => setTaskInput(e.target.value)}  // Update state variable
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            addTaskToContract(taskInput, contractId);  // Use taskInput
                            ev.preventDefault();
                            handleClose();
                            refresh();
                            setTaskInput('');  // Reset input
                        }
                    }}
                />
                <IconButton onClick={() => {
                    addTaskToContract(taskInput, contractId);  // Use taskInput
                    handleClose();
                    refresh();
                    setTaskInput('');  // Reset input
                }}>
                    <AddTaskIcon sx={{ color: 'green' }} />
                </IconButton>
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1 }}>
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