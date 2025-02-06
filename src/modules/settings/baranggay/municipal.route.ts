import baranggayFeature from "@/common/middlewares/sorter-filter/baranggay.features";
import express from "express";
import { BaranggayController } from "./baranggay.controller";

const router = express.Router();

const baranggayController = new BaranggayController;


// router.get("/", baranggayController.getUsersHandler)
router.post("/add_baranggay", (baranggayController as any).addBaranggayHandler)
router.get("/", baranggayFeature(), baranggayController.getBaranggaysHandler as any)
// router.get('/api/v1/user/:id', (userController as any).getOneUserHandler);


export const BaranggayRoute: express.Router = router;
