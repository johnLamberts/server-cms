import { supabase } from "@/config";

interface UploadBase64Options {
  base64: string;
  fileName: string;
  contentType: string;
  bucketName: string;
}

export const uploadBase64ToSupabase = async ({
  base64,
  fileName,
  contentType,
  bucketName,
}: UploadBase64Options): Promise<{ data: any; error: any }> => {
  try {
      // Remove the Base64 prefix (e.g., "data:image/png;base64,")
      const base64Data = base64.split(';base64,').pop();
      if (!base64Data) {
          throw new Error('Invalid Base64 string');
      }

      // Convert Base64 to a buffer
      const buffer = Buffer.from(base64Data, 'base64');

      // Upload the file to Supabase Storage
      const { data, error } = await supabase
          .storage
          .from(bucketName)
          .upload(fileName, buffer, {
              contentType: contentType,
              upsert: true,
          });

      if (error) {
          throw error;
      }

      return { data, error: null };
  } catch (error) {
      console.error('Error uploading file:', error);
      return { data: null, error };
  }
};

export default uploadBase64ToSupabase; 
