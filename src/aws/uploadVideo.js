import axios from 'axios';
import api from '../services/api';

function uploadVideo(file,name) {

  return new Promise(async (resolve, reject) => {
    if (!file) {
      reject('No file provided');
      return;
    }

    const token = localStorage.getItem('user-token');
    const headers = { 'Authorization': 'Bearer ' + token };
    const fileName = name;
    // First, retrieve the presigned URL from the backend
    const response = await api.get('/api/getPresignedUrl/' + fileName,  {headers});
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

export default uploadVideo;
