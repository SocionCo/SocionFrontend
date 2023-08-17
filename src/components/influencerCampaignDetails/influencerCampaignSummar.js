import { Box, Paper, Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import { formatDate } from "../../util/dateUtil";

const InfluencerCampaignSummary = ({ contract }) => {
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
            <Box sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center'
            }}>
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
                <Chip label={"Rate: $" + contract.creatorRate} variant="outlined"
                    sx={{
                        color: 'green',
                        borderColor: 'green',
                        marginRight: 1

                    }}
                />
            </Box>

        </Paper>
    );
}

export default InfluencerCampaignSummary;