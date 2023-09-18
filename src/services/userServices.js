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