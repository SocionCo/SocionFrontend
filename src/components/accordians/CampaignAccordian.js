import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import AttachmentBlock from '../campaignDetails/AttachmentBlock';
import EditCampaign from '../forms/EditCampaign';
import VerticalLinearStepper from '../steppers/VerticalLinearStepper';
import InfluencerEditCampaign from '../forms/influencerEditCampaign';
import TaskSticker from '../campaignDetails/taskSticker';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';

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

  return (
    <Box>
      {tasks.map((element, index) => {
        return <TaskSticker key={index} refresh={refresh} task={element} />;
      })}

      {showNextTask && (

        <TaskSticker refresh={refresh} isInputTask={true} contractId={contract.id} handleClose={() => setShowNextTask(false)} />

      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ marginY: 1, paddingY: 1 }} variant='contained' color='grey' onClick={() => setShowNextTask(true)} >
          Add Task
        </Button>
      </Box>
    </Box>
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
