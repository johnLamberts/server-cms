import { supabase } from "@/config";
import fs from "fs/promises"; // Node.js file system module to read the file

export const uploadFile = async (
  localFilePath: string,
  destination: string
): Promise<string> => {
  try {
    // Read file as a Buffer
    const fileBuffer = await fs.readFile(localFilePath);

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("museo_rizal") // Replace with your bucket name
      .upload(destination, fileBuffer, {
        cacheControl: "3600",
        upsert: true, // If you want to overwrite files with the same name
      })
      ;

    if (error) {
      throw new Error(`Supabase Storage upload failed: ${error.message}`);
    }

    const { data: publicUrlData } =  supabase.storage.from("museo_rizal").getPublicUrl(destination)
      

    // Generate a public URL for the uploaded file
    // const { data: publicUrlData, error: publicUrlError } = supabase.storage
    //   .from("museo_rizal")
    //   .getPublicUrl(destination);

    // if (publicUrlError) {
    //   throw new Error(`Error generating public URL: ${publicUrlError.message}`);
    // }

    return publicUrlData.publicUrl;
    
  } catch (error) {
    console.error(`[uploadFileError]: ${error}`);
    throw error;
  }
};

export default uploadFile;
