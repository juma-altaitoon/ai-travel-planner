import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const getSignedUpload = (req, res) => {
    const timestamp = Math.floor(Date.now()/1000);
    const folder = "avatars";
    const public_id = `avatar-${timestamp}`;

    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder,
            public_id,
        },
        cloudinary.config().api_secret
    );

    res.json({
        cloudName: cloudinary.config().cloud_name,
        apiKey: cloudinary.config().api_key,
        timestamp,
        folder,
        public_id,
        signature,
    });
};