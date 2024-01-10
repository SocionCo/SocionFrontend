import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import AttachmentBlock from '../campaignDetails/AttachmentBlock';
import EditCampaign from '../forms/EditCampaign';
import VerticalLinearStepper from '../steppers/VerticalLinearStepper';
import InfluencerCampaignSummary from './influencerCampaignSummar';

export default function InfluencerCampaignAccordian({ contract }) {
  const { attachments, tasks } = contract;

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
          <InfluencerCampaignSummary
            contractId={contract.id}
          />
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
            return <AttachmentBlock attachment={element} key={element.id}/>
          })
          }
        </AccordionDetails>
      </Accordion>

      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Tasks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <VerticalLinearStepper tasks={tasks}/> 
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}