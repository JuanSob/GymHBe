import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

// Settings
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (_req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});
export default multer({storage});