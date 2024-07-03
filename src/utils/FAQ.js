import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What is health insurance?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Health insurance is a type of insurance coverage that typically pays for medical, surgical, prescription drug, and sometimes dental expenses incurred by the insured.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How do I choose the right plan?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Choosing the right plan depends on your health needs, budget, and preferred providers. Consider the coverage options, network of doctors, and out-of-pocket costs.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What does the plan cover?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our plans cover a range of services including hospital stays, doctor visits, preventive care, prescriptions, and more. Specific coverage details can be found in the plan documentation.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FAQ;
