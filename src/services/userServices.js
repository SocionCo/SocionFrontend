import api from "./api";

export async function resetPassword(email) {
    try {
        const token = localStorage.getItem('user-token');
        const response = await api.post("/api/resetPassword/" + email);
        console.log("Response was", response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}


export async function getUserDetails() {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.get("/api/userDetails", { headers });
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function updateInfluencerSettings(influencerDTO) {
    console.log('DTO', influencerDTO);
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post("/api/updateInfluencerSettings",influencerDTO, { headers });
        
        return response;
    } catch (error) {
        console.log(error);
        return;
    }

}
