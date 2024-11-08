import { Application } from "express";
import { UserRoute } from "./user/user.route";

const API_VERSIONING_ENDPOINTS = `/api/v1`

export const router = async (app: Application) => {
  app.use(`${API_VERSIONING_ENDPOINTS}/user`, UserRoute)
}


export default router;
