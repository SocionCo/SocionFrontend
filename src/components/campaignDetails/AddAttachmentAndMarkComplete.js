import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as React from 'react';

const AddAttachmentAndMarkComplete = ({addAttachmentAction, markCompleteAction, completed}) => { 
    return (
        <Stack spacing={2} direction="row" sx={{
            justifyContent: 'center'
        }}>
          { !completed ?

          (<Button variant="contained" sx={{
            borderRadius: 25,
            color: 'black',
            backgroundColor: 'lightGrey'
            
          }}
          onClick={markCompleteAction}
          >Complete</Button>) : (<Button variant="contained" sx={{
            borderRadius: 25,
            color: 'black',
            backgroundColor: 'lightGrey'
            
          }}
          onClick={markCompleteAction}
          >Incomplete</Button>)

        }



          <Button 
          variant="contained"
          onClick={addAttachmentAction}
          
          sx={{
            borderRadius: 25,
            color: 'white',
            backgroundColor: 'green'
            
          }}>Add Attachment</Button>
        </Stack>
      );

}

export default AddAttachmentAndMarkComplete;