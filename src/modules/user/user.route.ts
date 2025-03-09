import { usersFeature } from "@/common/middlewares/sorter-filter";
import { uploadImage } from "@/utils/multer.utils";
import express from "express";
import { UserController } from "./user.controllers";

const router = express.Router();

const userController = new UserController;


// router.get("/", UserController.getUsersHandler)
router.post("/add_user", uploadImage.single("userImg"), (userController as any).addUserHandler)
router.get("/", usersFeature(), userController.getUsersHandler as any)
router.put("/update_user", uploadImage.single("userImg"), userController.updateUserHandler  as any)
router.put("/update_user_password", userController.updateUserPasswordHandler  as any)
// router.get('/api/v1/user/:id', (userController as any).getOneUserHandler);


export const UserRoute: express.Router = router;
