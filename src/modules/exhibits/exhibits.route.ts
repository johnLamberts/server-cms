import exhibitsFeature from "@/common/middlewares/sorter-filter/exhibit.features";
import express from "express";
import { ExhibitController } from "./exhibits.controllers";

const router = express.Router();

const exhibitController = new ExhibitController;


// router.get("/", exhibitController.getUsersHandler)
router.post("/add_exhibit", exhibitController.addExhibitHandler as any)
router.get("/", exhibitsFeature(), exhibitController.getExhibitHandler as any)
// router.get('/api/v1/user/:id', (visitorController as any).getOneUserHandler);


export const ExhibitRoute: express.Router = router;
