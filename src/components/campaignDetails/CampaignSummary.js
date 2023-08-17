import { Box, Paper, Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import { formatDate } from "../../util/dateUtil";

const CampaignSummary = ({ contract }) => {
    const { name, creationDate, completed } = contract;
    const stringDate = formatDate(creationDate);

    return (
        <Paper sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Box sx={{
                paddingLeft: 1
            }}>
                <Typography component='h4' variant='h4' >{name}</Typography>
                <Typography component='p' variant='subtitle1' >{"Created " + stringDate}</Typography>
            </Box>

            {
                completed ?
                    (<Chip label="Completed" variant="outlined"
                        sx={{
                            color: 'green',
                            borderColor: 'green',
                            marginRight: 1
                            
                        }}
                    />) :

                    (<Chip label="Incomplete" variant="outlined"
                        sx={{
                            color: 'red',
                            borderColor: 'red',
                            marginRight: 1
                        }}
                    />)

            }
        </Paper>
    );
}

export default CampaignSummary;