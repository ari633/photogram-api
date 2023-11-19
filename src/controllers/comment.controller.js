import { validationResult } from "express-validator";
import {
  getCommentByPhotoId,
  createNewComment,
} from "../services/comment.service";

export const getComment = async (req, res) => {
  const { photoId } = req.params;
  const comments = await getCommentByPhotoId(photoId);
  res.send({
    status: "OK",
    data: comments,
  });
};

export const createComment = async (req, res, next) => {
  const { body } = req;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    await createNewComment(body);
    res.send({
      status: "OK",
      data: [],
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
