import api from "./api";

export async function inviteInfluencerToAgency (email) { 

    const userDTO = { 
        email: email
    }

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/inviteInfluencer', userDTO, { headers });
    } catch (error) {
        console.log(error);
    }
}

export async function inviteTalentManagerToAgency (email) { 


    const userDTO = { 
        email: email
    }

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/inviteTalentManager', userDTO, { headers });
    } catch (error) {
        console.log(error);
    }
}

export async function getTalentManagersAtUsersAgency(formatForDropdown = false) { 

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.get('/api/getTalentManagers', { headers });
        if (formatForDropdown) {
            const formattedResponse = response.data.map(influencer => {
                return { label: `${influencer.firstName} ${influencer.lastName}`, email : `${influencer.email}`
            };
            });
            console.log("Response time", response);
            return formattedResponse;
        } else { 
            return response.data;
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllAgencyContractsForCurrentUser() { 
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.get('/api/getAllAgencyContractsForUser', { headers });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllAgencyContractsForProvidedUser(email) { 

    const userDTO = { 
        email: email
    }

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/getAllAgencyContractsForUser', userDTO, { headers });
        console.log("Called mad heavy response",response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllActiveAgencyContractsForProvidedUser(email) { 

    const userDTO = { 
        email: email
    }

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/getAllActiveAgencyContractsForUser', userDTO, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export async function removeInfluencerFromAgency(email) { 

    const userDTO = { 
        email: email
    }

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/deleteInfluencerFromAgency', userDTO, { headers });
        console.log("Response", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllCompletedAgencyContractsForProvidedUser(email) { 

    const userDTO = { 
        email: email
    }

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/getAllCompletedAgencyContractsForUser', userDTO, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateTalentManagersForUser(talentManagers, userEmail) {

    const formattedTalentManagers = talentManagers.map(talentManager =>{
        return { 
            email: talentManager.email
        }
    })

    const twoUserWrapper = { 
        influencer : { 
            email: userEmail
        }, 
        talentManager : talentManagers
    }

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/updateTalentManagersForInfluencer', twoUserWrapper, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
