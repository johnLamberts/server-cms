

import { bucket } from "@/config";
import fs from "fs/promises"; // For creating temporary files
import path from "path"; // For handling file paths
import { v4 as uuidv4 } from "uuid"; // To generate unique filenames

export const uploadBase64Image = async (
  base64Data: string,
  destination: string
): Promise<string> => {
  // Validate Base64 format
  if (!base64Data.startsWith("data:image/")) {
    throw new Error("Invalid Base64 image string");
  }

  // Extract MIME type and Base64 content
  const matches = base64Data.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid Base64 image string");
  }
  const mimeType = matches[1];
  const base64Content = matches[2];

  // Determine file extension from MIME type
  const extension = mimeType.split("/")[1];
  const tempFileName = `${uuidv4()}.${extension}`;
  const tempFilePath = path.join("/tmp", tempFileName);

  try {
    // Decode Base64 and save to temporary file
    await fs.writeFile(tempFilePath, Buffer.from(base64Content, "base64"));

    // Upload the temporary file to the bucket
    await bucket.upload(tempFilePath, { destination });

    // Get a signed URL for the uploaded file
    const fileRef = bucket.file(destination);
    const [url] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-17-2025",
    });

    return url;
  } finally {
    // Clean up the temporary file
    await fs.unlink(tempFilePath);
  }
};

export default uploadBase64Image;
