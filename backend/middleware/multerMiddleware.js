import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/avatars");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const newName = `${file.fieldname}-${Date.now()}${ext}`;
        cb(null, newName)
    },
});

const fileFilter = (req, file,  cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed."), false)
    }
};

export const uploadAvatar = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export default { uploadAvatar };