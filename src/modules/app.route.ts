import { Application } from "express";
import { MunicipalRoute } from "./settings/municipality/municipal.route";
import { UserRoute } from "./user/user.route";
import { VisitorRoute } from "./visitors/visitor.route";

const API_VERSIONING_ENDPOINTS = `/api/v1`

export const router = async (app: Application) => {
  app.use(`${API_VERSIONING_ENDPOINTS}/user`, UserRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/municipality`, MunicipalRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/visitor`, VisitorRoute)
}


export default router;
