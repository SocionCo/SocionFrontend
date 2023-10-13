import api from "./api";
import axios from "axios";

export async function createNewContract({ userDTO, contractDTO }) {
    console.log("Entered New Contract Call");
    const wrapper = {
        userDTO: userDTO,
        contractDTO: contractDTO
    }
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/createNewContractForInfluencers', wrapper, { headers });
        console.log("Response:", response);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function editContract({ contractDTO, userDTO }) {
    console.log("Edit Contract, ",  contractDTO);


    const wrapper = {
        userDTO: userDTO,
        contractDTO: contractDTO
    }
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/editContract', wrapper, { headers });
        console.log("Respy", response);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function deleteContractWithId(contractId) {
    const contractDTO = {
        id: contractId
    }
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/deleteContract', contractDTO, { headers });
        console.log(response);
    } catch (error) {
        console.log(error);
        return;
    }


}

export async function getContractDetailsWithId(contractId) {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.get('/api/getContractDetails/' + contractId, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }

}

export async function updateInfluencers(influencers, contractId) {

    const newUsers = (influencers) => {
        return influencers.map(influencer => {
            return { email: influencer.email };
        });
    }

    const contractWrapper = {
        contractDTO: {
            id: contractId
        },
        userDTO: newUsers(influencers)
    }

    try {
        console.log("Wrapper", contractWrapper);
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/updateInfluencersForContract', contractWrapper, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function removeInfluencersFromContract(influencers, contractId) {

    const newUsers = (influencers) => {
        return influencers.map(influencer => {
            return { email: influencer.email };
        });
    }

    const contractWrapper = {
        contractDTO: {
            id: contractId
        },
        userDTO: newUsers(influencers)
    }

    try {
        console.log("Wrapper", contractWrapper);
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/removeInfluencersFromContract', contractWrapper, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}


export async function addAttachmentToCampaign(attachmentDTO) {

    console.log("DTO", attachmentDTO);

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/addAttachmentToContract', attachmentDTO, { headers });
        console.log("Response time", response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }

}

export async function addInvoiceToCampaign(invoiceDTO) {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post("/api/addInvoiceToContract", invoiceDTO, { headers });
        console.log("Response time", response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }


}

export async function markContractAsComplete(contractDTO) {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/markContractAsComplete', contractDTO, { headers });
        console.log("Response time", response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function markContractAsIncomplete(contractDTO) {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/markContractAsIncomplete', contractDTO, { headers });
        console.log("Response time", response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}


export function uploadAttachment(file, name) {

    return new Promise(async (resolve, reject) => {
        if (!file) {
            reject('No file provided');
            return;
        }

        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const fileName = name;
        // First, retrieve the presigned URL from the backend
        const response = await api.get('/api/getPresignedUrl/' + fileName, { headers });
        const presignedUrl = response.data;

        // Then upload the file to S3 using the presigned URL
        await axios.put(presignedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });

        // Set the file URL after the file has been uploaded
        const fileUrl = `https://socion-draft-bucket.s3.us-east-2.amazonaws.com/${fileName}`;

        resolve(fileUrl);
    });
}


export async function deleteAttachment(attachmentDTO) {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/deleteAttachment', attachmentDTO, { headers });
        console.log("Delete attachment response", response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function deleteInvoice(invoiceDTO) {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/deleteInvoiceFromContract', invoiceDTO, { headers });
        console.log("Delete attachment response", response);
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function addTaskToContract(taskName, taskDescription, contractId) {

    const taskWrapper = {
        taskDTO: {
            taskName: taskName,
            details: taskDescription,
            taskCompleted: false
        },
        contractDTO: {
            id: contractId
        }
    }

    console.log("taskWrapper", taskWrapper);

    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/addTaskToContract', taskWrapper, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function checkOffTask(taskDTO) {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/completeTask', taskDTO, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function markTaskAsUnchecked(taskDTO) {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/markTaskAsIncomplete', taskDTO, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function deleteTask(taskDTO) {
    try {
        const token = localStorage.getItem('user-token');
        const headers = { 'Authorization': 'Bearer ' + token };
        const response = await api.post('/api/deleteTask', taskDTO, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

