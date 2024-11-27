import museumFeature from "@/common/middlewares/sorter-filter/museum.features";
import express from "express";
import { MuseumController } from "./museum.controllers";

const router = express.Router();

const museumController = new MuseumController;


// router.get("/", museumController.getUsersHandler)
router.post("/add_museum", museumController.addMuseumHandler as any)
router.get("/", museumFeature(), museumController.getMuseumHandler as any)
// router.get('/api/v1/user/:id', (visitorController as any).getOneUserHandler);


export const MuseumRoute: express.Router = router;
