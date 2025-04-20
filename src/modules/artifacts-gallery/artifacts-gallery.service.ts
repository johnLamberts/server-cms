import { supabase } from "@/config";
import { IArtifact } from "./artifacts-gallery.interface";

export class ArtifactService {
  /**-------------------------------------------------- */
  // Create Artifact                                     |
  /**-------------------------------------------------- */
  async createArtifact(payload: IArtifact): Promise<IArtifact> {
    try {
      // Insert artifact record
      const { data: artifact, error: artifactError } = await supabase
        .from("artifacts")
        .insert({
          title: payload.title,
          description: payload.description,
          period: payload.period,
          category: payload.category,
          artifactImg: payload.artifactImg,
          featured: payload.featured || false,
          status: 'active'
        })
        .select()
        .single();

      if (artifactError) throw `[ArtifactErrorService]: ${JSON.stringify(artifactError, null, 0)}`;

      // You might want to notify museum staff about new artifacts
      // await EmailService.newArtifactAddedEmail(payload);

      return artifact;
    } catch (error) {
      console.error("Error in createArtifact:", error);
      throw error;
    }
  }

  /**-------------------------------------------------- */
  // Update Artifact                                     |
  /**-------------------------------------------------- */
  async updateArtifact(artifact_id: string, payload: IArtifact): Promise<IArtifact> {
    try {
      // Log incoming payload for debugging
      console.log("Update Artifact Payload:", payload);

      // Update artifact record
      const { data: artifact, error: artifactError } = await supabase
        .from("artifacts")
        .update({
          title: payload.title,
          description: payload.description,
          period: payload.period,
          category: payload.category,
          artifactImg: payload.artifactImg,
          featured: payload.featured,
          updated_at: new Date().toISOString()
        })
        .eq("artifact_id", artifact_id)
        .select()
        .single();

      console.log("Update result:", artifact);
      console.error("Update error if any:", artifactError);

      if (artifactError) throw `[ArtifactErrorService]: ${JSON.stringify(artifactError, null, 0)}`;

      // You could notify relevant staff about the update
      // await EmailService.artifactUpdatedEmail(payload);

      return artifact;
    } catch (error) {
      console.error("Error in updateArtifact:", error);
      throw error;
    }
  }

  /**-------------------------------------------------- */
  // Update Featured Status                              |
  /**-------------------------------------------------- */
  async updateFeaturedStatus(artifact_id: string, featured: boolean): Promise<IArtifact> {
    try {
      const { data: artifact, error: artifactError } = await supabase
        .from("artifacts")
        .update({
          featured: featured,
          updated_at: new Date().toISOString()
        })
        .eq("artifact_id", artifact_id)
        .select()
        .single();

      if (artifactError) throw `[ArtifactErrorService]: ${JSON.stringify(artifactError, null, 0)}`;

      return artifact;
    } catch (error) {
      console.error("Error in updateFeaturedStatus:", error);
      throw error;
    }
  }

  /**-------------------------------------------------- */
  // Delete Artifact                                     |
  /**-------------------------------------------------- */
  async deleteArtifact(artifact_id: string): Promise<{ success: boolean }> {
    try {
      const { error: artifactError } = await supabase
        .from("artifacts")
        .delete()
        .eq("artifact_id", artifact_id);

      if (artifactError) throw `[ArtifactErrorService]: ${JSON.stringify(artifactError, null, 0)}`;

      return { success: true };
    } catch (error) {
      console.error("Error in deleteArtifact:", error);
      throw error;
    }
  }

  /**-------------------------------------------------- */
  // Get One Artifact                                    |
  /**-------------------------------------------------- */
  async getOneArtifact(artifact_id: string): Promise<IArtifact> {
    try {
      const { data: artifact, error: artifactError } = await supabase
        .from("artifacts")
        .select(`
          *,
          municipalities:municipal_id (municipal)
        `)
        .eq("artifact_id", artifact_id)
        .single();

      if (artifactError) throw `[ArtifactErrorService]: ${JSON.stringify(artifactError, null, 0)}`;

      return artifact;
    } catch (error) {
      console.error("Error in getOneArtifact:", error);
      throw error;
    }
  }
}

export default ArtifactService;
