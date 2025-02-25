import eventFeature from "@/common/middlewares/sorter-filter/events.feature";
import express from "express";
import { HomeController } from "./home.controllers";

const router = express.Router();

const eventController = new HomeController;


// router.get("/", eventController.getUsersHandler)
router.post("/add_home_editor", (eventController as any).addHomeHandler)
router.get("/", eventFeature(), eventController.getHomeHandler as any)
// router.get('/api/v1/user/:id', (visitorController as any).getOneUserHandler);


export const HomeRoute: express.Router = router;
