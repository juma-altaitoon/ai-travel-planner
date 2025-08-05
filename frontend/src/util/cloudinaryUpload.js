import { Cloudinary } from '@cloudinary/url-gen';

export const uploadToCloudinary = async (avatar, signedData) => {
    const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
    const cl = new Cloudinary({ cloud: { cloudName: signedData.cloudName } });

    const formData = new FormData();
    formData.append('file', avatar);
    formData.append('folder', signedData.folder);
    formData.append('api_key', signedData.apiKey);
    formData.append('timestamp', signedData.timestamp);
    formData.append('signature', signedData.signature);
    formData.append('public_id', signedData.public_id);

    const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json()
    // Image URL
    return {
        url : data.secure_url,
        publicId: data.public_id,
    }; 
};
