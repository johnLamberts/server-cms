import { bucket } from "@/config";

export const uploadFile = async(localFilePath: string, destination: string): Promise<string> => {
  await bucket.upload(localFilePath, {
    destination,
  })

  const fileRef = bucket.file(destination);

  const [ url ] = await fileRef.getSignedUrl({
    action: 'read',
    expires: '03-17-2025',
  })

  return url;
}

export default uploadFile;
