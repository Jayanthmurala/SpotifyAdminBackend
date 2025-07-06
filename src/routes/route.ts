import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import albumController from "../controllers/admin.controller.js";
import songController from "../controllers/song.controller.js";
import upload from "../middlewares/multer.middleware.js";

const adminRoutes = Router();

// Album routes
adminRoutes.post("/album/new", adminMiddleware, upload, albumController.addAblum);
adminRoutes.delete("/album/:id", adminMiddleware, albumController.deleteAlbum);





// Song routes
adminRoutes.post("/song/new", adminMiddleware, upload, songController.addSong);
adminRoutes.put("/song/cover/:id", adminMiddleware, upload, songController.update_cover_image);
adminRoutes.delete("/song/:id", adminMiddleware, songController.deleteSong);

export default adminRoutes;