import { Application } from "express";
import { ArtifactRoute } from "./artifacts-gallery/artifacts-gallery.route";
import { AuthRoute } from "./authentication/auth.route";
import { EventRoute } from "./event/event.route";
import { ExhibitRoute } from "./exhibits/exhibits.route";
import { MuseumRoute } from "./museum/museum.route";
import { HomeRoute } from "./page_editor/home/home.route";
import { BaranggayRoute } from "./settings/baranggay/municipal.route";
import { ExhibitionTypeRoute } from "./settings/exhibition_type/exhibition.route";
import { MunicipalRoute } from "./settings/municipality/municipal.route";
import { UserRoute } from "./user/user.route";
import { VisitorRoute } from "./visitors/visitor.route";

const API_VERSIONING_ENDPOINTS = `/api/v1`

export const router = async (app: Application) => {
  app.use(`${API_VERSIONING_ENDPOINTS}/user`, UserRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/municipality`, MunicipalRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/baranggay`, BaranggayRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/exhibition`, ExhibitionTypeRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/visitor`, VisitorRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/museum`, MuseumRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/event`, EventRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/exhibit`, ExhibitRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/home_edits`, HomeRoute)
  app.use(`${API_VERSIONING_ENDPOINTS}/artifacts`, ArtifactRoute)

  // AUTH
  app.use(`${API_VERSIONING_ENDPOINTS}/auth`, AuthRoute)

}


export default router;
