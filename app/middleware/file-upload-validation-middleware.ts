import { NextFunction, Request, Response } from 'express';
import * as path from 'path';
import i18n from '../../locale/en.json';

const multer = require('multer');
const config = require('config');
const maxFileSizeInMb: number = config.get('evidenceUpload.maxFileSizeInMb');

const SUPPORTED_FORMATS = [
  '.jpg', '.jpeg', '.bmp', '.tif', '.tiff', '.png',
  '.pdf', '.txt', '.doc', '.dot', '.docx', '.dotx',
  '.xls', '.xlt', '.xla', '.xlsx', '.xltx', '.xlsb',
  '.ppt', '.pot', '.pps', '.ppa', '.pptx', '.potx',
  '.ppsx', '.rtf', '.csv'
];

/**
 * Multer upload configuration that includes limits for file type formats and limits for the size
 */
const uploadConfiguration = multer({
  limits: { fileSize: (maxFileSizeInMb * 1024 * 1024) },
  fileFilter: (req, file, cb) => {
    const fileTypeError = 'LIMIT_FILE_TYPE';
    if (SUPPORTED_FORMATS.includes(path.extname(file.originalname.toLowerCase()))) {
      cb(null, true);
    } else {
      cb(new multer.MulterError(fileTypeError), false);
    }
  }
}).single('file-upload');

function handleFileUploadErrors(err: any, req: Request, res: Response, next: NextFunction) {
  let error: string;

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      error = `${i18n.validationErrors.fileUpload.fileTooLarge} ${maxFileSizeInMb}MB`;
    } else if (err.code === 'LIMIT_FILE_TYPE') {
      const supported: string = SUPPORTED_FORMATS.join(', ');
      error = `${i18n.validationErrors.fileUpload.incorrectFormat} ${supported}`;
    } else {
      error = i18n.validationErrors.fileUpload.fileCannotBeUploaded;
    }
    res.locals.multerError = error;
    return next();
  }
  return next(err);
}

export {
  uploadConfiguration,
  handleFileUploadErrors
};
