import api from "./api";


export async function getUserType() { 
    try { 
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.get('/api/getUserType', { headers });
        return response.data;
    } catch (error) { 
        console.log(error);
    }
}

export async function getInfluencersManagedBy(formatForDropdown = true) { 
    try { 
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.get('/api/getManagedInfluencersForUser', { headers });
        if (formatForDropdown) {
            const formattedResponse = response.data.map(influencer => {
                return { label: `${influencer.firstName} ${influencer.lastName}`, email : `${influencer.email}`
            };
            });
            return formattedResponse;
        } else { 
            return response.data;
        }
    } catch(error) {
        console.log(error);
        return [];
    }  
}

export async function getTalentManagersForUser(email, formatForDropdown = true) { 
    const userDTO = { 
        email: email
    }

    try { 
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/getTalentManagersForUser', userDTO, { headers });
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
    } catch(error) {
        console.log(error);
        return [];
    }  


}


export async function getUserInformation() {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.get('/api/getUserInfo', { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }

}