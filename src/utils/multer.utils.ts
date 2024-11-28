import { ensureDirectoryExists, getFileName, getImageExtension } from "@/utils";
import { randomUUID } from "crypto";
import { Request } from "express";
import createHttpError from "http-errors";
import multer from "multer";
import path from "path";

type DestinationCB = (error: Error | null, destination: string) => void;
type FileNameCB = (error: Error | null, filename: string) => void;

export const fileStorage = multer.diskStorage({
  destination: (
    req: Request, file: Express.Multer.File, callback: DestinationCB
  ): void => {
    const fileName = getFileName(req.originalUrl);

    console.log(req.originalUrl)


  // callback(null, `public/uploads/${fileName}`);

  const uploadPath = path.resolve(
    process?.env?.PWD as string,
    "public/uploads",
    fileName
  );


  ensureDirectoryExists(uploadPath);

  callback(null, uploadPath);
  },
  filename: (
    request: Request,
    file: Express.Multer.File,
    callback: FileNameCB
  ) => {
    if (process?.env?.NODE_ENV && process?.env?.NODE_ENV === "development") {
      console.log(file);
    }

    const imageExtension = getImageExtension(file.mimetype);

    if (!imageExtension) {
      callback(
        createHttpError(422, "Invalid request (File type is not supported)"),
        ""
      );

      return;
    }

    callback(null, `${file.fieldname}-${randomUUID()}${imageExtension}`);
  },
})


export const uploadImage = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 18, // accept files up to mgb
  },
});

export const customMulterConfig = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 10, // accept files up 10 mgb
  },
  fileFilter: (
    request: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) => {
    if (!getImageExtension(file.mimetype)) {
      // @ts-ignore
      callback(
        createHttpError(
          422,
          "Invalid request (File type is not supported)"
        ) as any,
        false
      );
      return;
    }
    callback(null, true);
  },
});

export default { uploadImage }
