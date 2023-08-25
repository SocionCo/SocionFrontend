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
import { Button } from '@mui/base';
import { IconButton } from '@mui/material';

export default function CampaignAccordian({ contract, refresh }) {
  const { attachments, tasks } = contract;
  const userType = localStorage.getItem("user-type");
  const [showNextTask, setShowNextTask] = React.useState(false);


  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            margin: '0',
          }}

        >
          <Typography>Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {(userType === "Admin" || userType === "TalentManager") ?
            (<EditCampaign
              refresh={refresh}
              contractId={contract.id}
            />) : (<InfluencerEditCampaign
              refresh={refresh}
              contractId={contract.id}
            />)
          }
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Tasks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {tasks.map((element) => {
            return <TaskSticker refresh={refresh} task={element}/>
          })}
          {showNextTask && <TaskSticker refresh={refresh} isInputTask={true} contractId={contract.id} handleClose={() => setShowNextTask(false)}/>}

          <IconButton sx={{color:'green', m: 0, p: 0, marginTop: 1}} onClick={() => setShowNextTask(true)} >
            <AddTaskIcon/>
            </IconButton>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Attachments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            attachments.map(element => {
              return <AttachmentBlock refresh={refresh} attachment={element} key={element.id} />
            })
          }
        </AccordionDetails>
      </Accordion>


    </div>
  );
}