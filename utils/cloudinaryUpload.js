import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const streamUpload = (buffer, folder, resource_type) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (result) resolve(result);
        else if (error) reject(error);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
