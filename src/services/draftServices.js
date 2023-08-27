import api from "./api";

export async function addDraftToCampaign(draftDTO) { 
 
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/addDraftToContract', draftDTO, { headers });
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}


export async function reviewDraft(oldDraftDTO, approvalStatus, comments) { 
   const draftDTO= { 
       ...oldDraftDTO,
       approvalStatus: approvalStatus,
       approvalNotes: comments.toUpperCase()
   }

   console.log("DTO",draftDTO);


    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/reviewDraft', draftDTO, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function addCommentToDraft(contractId, draftId, comment, timeStamp) { 
    const DraftAndCommentDTO = { 
        draftDTO : { 
            id: draftId,
            contractId: contractId
        }, 
        videoCommentDTO : {
            comment: comment,
            timeStamp: timeStamp,

        }
    }

     try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/addCommentToDraft', DraftAndCommentDTO, { headers });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function deleteCommentFromDraft(commentId) { 
    const VideoCommentDTO = { 
        id: commentId
    }

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/deleteCommentFromDraft', VideoCommentDTO, { headers });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}
