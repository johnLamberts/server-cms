import artifactsFeature from "@/common/middlewares/sorter-filter/artifacts.features";
import { uploadImage } from "@/utils/multer.utils";
import express from "express";
import { ArtifactController } from "./artifacts-gallery.controller";

const router = express.Router();

const artifactController = new ArtifactController();
  
router.post("/add_artifact", uploadImage.single("artifactImg"), (artifactController as any).addArtifactHandler);
router.put("/update_artifact", uploadImage.single("artifactImg"), (artifactController as any).updateArtifactHandler);
router.delete("/delete_artifact/:id", (artifactController as any).deleteArtifactHandler);
router.put("/update_featured_status", (artifactController as any).updateFeaturedStatusHandler);
router.get("/", artifactsFeature(), artifactController.getArtifactsHandler as any);
router.get("/:id", (artifactController as any).getOneArtifactHandler);

export const ArtifactRoute: express.Router = router;
