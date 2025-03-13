import exhibitionFeature from "@/common/middlewares/sorter-filter/exhibition.features";
import express from "express";
import { MunicipalController } from "./exhibition.controller";

const router = express.Router();

const userController = new MunicipalController;


// router.get("/", UserController.getUsersHandler)
router.get("/", exhibitionFeature(), userController.getExhibitionsHandler as any)
// router.get('/api/v1/user/:id', (userController as any).getOneUserHandler);


export const ExhibitionTypeRoute: express.Router = router;
