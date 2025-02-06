import express from "express";
import AuthController from "./auth.controller";

const router = express.Router();

const authController = new AuthController;


// router.get("/", authController.getUsersHandler)
router.post("/login", (authController as any).loginHandler)
// router.get("/", baranggayFeature(), authController.getBaranggaysHandler as any)
// router.get('/api/v1/user/:id', (userController as any).getOneUserHandler);


export const AuthRoute: express.Router = router;
