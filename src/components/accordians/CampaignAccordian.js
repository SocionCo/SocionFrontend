import { Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import * as React from 'react';
import AttachmentBlock from '../campaignDetails/AttachmentBlock';
import TaskSticker from '../campaignDetails/taskSticker';
import EditCampaign from '../forms/EditCampaign';
import InfluencerEditCampaign from '../forms/influencerEditCampaign';
import { addTaskToContract } from '../../services/campaignServices';


export function AttachmentsTab({ contract, refresh, handleOpen }) {
  const { attachments } = contract;

  return (
    <>
      {attachments.map(element => {
        return <AttachmentBlock refresh={refresh} attachment={element} key={element.id} />
      })}


      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
        <Button sx={{ marginY: 1, paddingY: 1 }} variant='contained' color='grey' onClick={handleOpen}> Add Attachment
        </Button >
      </Box>
    </>
  );
}

export function TasksTab({ contract, refresh }) {
  const { tasks } = contract;
  const [showNextTask, setShowNextTask] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const [taskDescription, setTaskDescription] = React.useState("");

  const handleClose = () => {
    setShowNextTask(false);
  }

  const handleSubmit = () => { 
    addTaskToContract(taskName, taskDescription, contract.id);
    refresh();
    handleClose();
  }

  return (
    <>
      <Dialog
        open={showNextTask}
        onClose={handleClose}
        aria-labelledby="task-dialog-title"
        aria-describedby="task-dialog-description">
        <DialogTitle id="task-dialog-title">Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            label="Task Name"
            type="text"
            fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="taskDescription"
            label="Task Description"
            type="text"
            fullWidth
            multiline
            rows={4} 
            rowsmax={10} 
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        {tasks.map((element, index) => {
          return <TaskSticker key={index} refresh={refresh} task={element} />;
        })}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button sx={{ marginY: 1, paddingY: 1 }} variant='contained' color='grey' onClick={() => setShowNextTask(true)} >
            Add Task
          </Button>
        </Box>
      </Box>
    </>
  );
}


export function EditTab({ contract, refresh }) {

  const userType = localStorage.getItem('user-type');

  return (
    userType === "Admin" || userType === "TalentManager" ? (
      <EditCampaign
        refresh={refresh}
        contractId={contract.id}
      />
    ) : (
      <InfluencerEditCampaign
        refresh={refresh}
        contractId={contract.id}
      />
    )
  );
}
