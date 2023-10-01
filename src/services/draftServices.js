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

export async function replyToComment(contractId, draftId, comment, timeStamp, replyingToId) { 
    const DraftAndCommentDTO = { 
        draftDTO : { 
            id: draftId,
            contractId: contractId
        }, 
        videoCommentDTO : {
            comment: comment,
            timeStamp: timeStamp,

        },
        replyingToComment : { 
            id: replyingToId
        }
    }

     try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/replyToComment', DraftAndCommentDTO, { headers });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function generateReviewalLinkForDraft(draftId, contractId) { 
    const draftDTO = { 
        id: draftId,
        contractId: contractId
    }

    try {
        console.log("Posting: ", draftDTO);
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/generateDraftSharelink', draftDTO, { headers });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }

    
}


export async function getDraftInformationWithGuestToken(guestToken) { 
    try {
        console.log("Posting: ", guestToken);
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/getDraftInfoWithToken/' + guestToken,{ headers });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function addGuestCommentToDraft(brandName,displayName, contractId, draftId, comment, timeStamp) { 
    const DraftAndCommentDTO = { 
        draftDTO : { 
            id: draftId,
            contractId: contractId
        }, 
        videoCommentDTO : {
            displayName : displayName,
            comment: comment,
            timeStamp: timeStamp,
            brandName: brandName

        }
    }

     try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/addGuestCommentToDraft', DraftAndCommentDTO, { headers });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}
