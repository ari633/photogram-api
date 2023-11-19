import express from "express";
import { getComment, createComment } from "../controllers/comment.controller";
import { validate } from "../services/comment.service";

const commentRoute = express.Router();
commentRoute.route("/:photoId").get(getComment);
commentRoute.route("/").post(validate("createComment"), createComment);

export default commentRoute;
