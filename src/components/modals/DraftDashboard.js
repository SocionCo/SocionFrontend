import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Dialog, IconButton, Slide } from "@mui/material";
import * as React from 'react';
import AdminVideoPlayer from "../videoPlayer/VideoPlayer";
import { ThemeProvider } from 'react-bootstrap';
import { createTheme } from '@mui/system';
import styled from '@emotion/styled';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import { getContractDetailsWithId } from '../../services/campaignServices';
import { useNavigate, useParams } from 'react-router-dom';
import { act } from 'react-dom/test-utils';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DraftDashboard = () => {

  const userType = localStorage.getItem('user-type');
  const { contractId } = useParams();
  const [activeContract, setActiveContract] = React.useState(null);

  const navigate = useNavigate();


  React.useEffect(() => {
    const hitApi = async () => {
      const details = await getContractDetailsWithId(contractId);
      setActiveContract(details);
    }
    hitApi();
  },[]);

  if (!activeContract) { 
    return (<CircularProgress/>);
  }

  return (

    <>{userType === "Admin" || userType === "TalentManager" ?
      (
        <VideoPlayer
          isForAdmin={true}
          drafts={activeContract.drafts}
          handleClose={() => navigate('/campaign/' + contractId)}
          contractId={contractId} />
      ) :
      (
        <VideoPlayer
          draft={activeContract.drafts}
          handleClose={() => navigate('/campaign/' + contractId)}
          contractId={contractId}
        />
      )

    }
    </>
  );
}

export default DraftDashboard;