import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default function VerticalLinearStepper({ tasks }) {
    const [key, setKey] = React.useState(0);

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={key} orientation="vertical">
                {
                    tasks.map(task => {
                        return (
                            <Step key={task.id}>
                                <StepLabel>{task.name}</StepLabel>
                                <StepContent>
                                    <Typography>{task.details}</Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => setKey(key + 1)}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {"Complete"}
                                    </Button>
                                    <Button
                                        onClick={() => setKey(key - 1)}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {"Incomplete"}
                                    </Button>
                                </StepContent>
                            </Step>
                        );
                    })
                }
            </Stepper>
        </Box>
    );
}