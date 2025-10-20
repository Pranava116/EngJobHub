import fileUpload from 'express-fileupload';

export const upload = fileUpload({
  useTempFiles: true,       
  tempFileDir: '/tmp/',     
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true,
  createParentPath: true,
});
