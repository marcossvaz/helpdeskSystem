import multer from 'multer';
import path from 'node:path';
import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';
import { mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';


const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'attachments');
mkdirSync(UPLOAD_DIR, {recursive: true});

const ALLOWED_MIME_TYPES: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'application/pdf': '.pdf',
    'text/plain': '.txt',
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), UPLOAD_DIR));
    },
    filename: (_req, file, cb) => {
        cb(null, `${randomUUID()}${ALLOWED_MIME_TYPES[file.mimetype]}`);
    }
})


const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
    if(file.mimetype in ALLOWED_MIME_TYPES) return cb(null, true);
    cb(new AppError('Tipo de arquivi nõa aceito. Aceitos: jpg, png, pdf, pdf, txt', 400));
}


export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024,
        files: 5
    },
})