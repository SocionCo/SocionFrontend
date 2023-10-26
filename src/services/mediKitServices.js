import api from "./api";

export async function generateMediaKit({influencerEmail}) { 
    const influencerDTO = {
        email : influencerEmail
    }

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/generateMediaKit', influencerDTO, { headers });
        console.log("esponse",response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}