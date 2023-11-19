import express from "express";
import { getPhotos, createPhoto } from "../controllers/photo.controller";
import { validate } from "../services/photo.service";

const photoRoute = express.Router();
photoRoute.route("/").get(getPhotos);
photoRoute.route("/").post(validate("createPhoto"), createPhoto);

export default photoRoute;
