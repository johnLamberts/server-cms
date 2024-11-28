import eventFeature from "@/common/middlewares/sorter-filter/events.feature";
import { uploadImage } from "@/utils/multer.utils";
import express from "express";
import { EventController } from "./event.controllers";

const router = express.Router();

const eventController = new EventController;


// router.get("/", eventController.getUsersHandler)
router.post("/add_event", uploadImage.single("coverPhoto"), (eventController as any).addEventHandler)
router.get("/", eventFeature(), eventController.getMuseumHandler as any)
// router.get('/api/v1/user/:id', (visitorController as any).getOneUserHandler);


export const EventRoute: express.Router = router;
