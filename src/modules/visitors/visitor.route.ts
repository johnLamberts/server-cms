import visitorFeature from "@/common/middlewares/sorter-filter/visitor.features";
import { uploadImage } from "@/utils/multer.utils";
import express from "express";
import { VisitorController } from "./visitor.controllers";

const router = express.Router();

const visitorController = new VisitorController;
  
// router.get("/", visitorController.getUsersHandler)
router.post("/add_visitor", uploadImage.single("visitorImg"), (visitorController as any).addVisitorHandler)
router.get("/", visitorFeature(), visitorController.getVisitorHandler as any)
// router.get('/api/v1/user/:id', (visitorController as any).getOneUserHandler);


export const VisitorRoute: express.Router = router;
