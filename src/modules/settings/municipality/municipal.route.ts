import municipalFeature from "@/common/middlewares/sorter-filter/municipal.features";
import express from "express";
import { MunicipalController } from "./municipal.controller";

const router = express.Router();

const userController = new MunicipalController;


// router.get("/", UserController.getUsersHandler)
router.post("/add_municipal", (userController as any).addMunicipalHandler)
router.get("/", municipalFeature(), userController.getMunicipalsHandler as any)
// router.get('/api/v1/user/:id', (userController as any).getOneUserHandler);


export const MunicipalRoute: express.Router = router;
