import express from "express";
import { UserController } from "./user.controllers";

const router = express.Router();

const userController = new UserController;


// router.get("/", UserController.getUsersHandler)
router.post("/add_user", (userController as any).addUserHandler)
// router.get("/", usersFeature(), userController.getStudentsHandler as any)
// router.get('/api/v1/user/:id', (userController as any).getOneUserHandler);


export const UserRoute: express.Router = router;
