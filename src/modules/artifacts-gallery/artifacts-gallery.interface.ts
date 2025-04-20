
export interface IArtifact {
  artifact_id?: string;
  artifact_uid?: string;
  
  title: string;
  description: string;
  period?: string;
  
  artifactImg?: string;
  
  category: string;
  
  featured?: boolean;
  status?: string;
  
  created_at?: string;
  updated_at?: string;
}
