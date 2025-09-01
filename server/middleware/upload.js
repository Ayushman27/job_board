import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
destination: (_req, _file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
filename: (_req, file, cb) => {
const ext = path.extname(file.originalname);
cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
}
});


export const upload = multer({ storage });