import axios from 'axios';
import api from '../services/api';

async function uploadVideo(file, name, onUploadProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file) {
        throw new Error('No file provided');
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
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log(`Upload Progress: ${progress}%`);
          if (onUploadProgress) {
            onUploadProgress(progress);
          }
        },
      });

      // Set the file URL after the file has been uploaded
      const fileUrl = `https://socion-draft-bucket.s3.us-east-2.amazonaws.com/${fileName}`;
      resolve(fileUrl);
    } catch (error) {
      console.error('Error uploading video:', error.message);
      reject(error.message);
    }
  });
}

export default uploadVideo;
