import { body } from "express-validator";
import {
  selectCommentByPhotoId,
  insertComment,
} from "../repositoy/comment.repository";
import * as uuid from "uuid";

export const getCommentByPhotoId = (photoId) => {
  return selectCommentByPhotoId(photoId);
};

export const createNewComment = (payload) => {
  return insertComment({
    uuid: uuid.v4(),
    text: payload?.text,
    photo_id: payload?.photo_id,
  });
};

export const validate = (method) => {
  switch (method) {
    case "createComment": {
      return [
        body("text", "Caption cannot empty").exists(),
        body("photo_id", "Photo id cannot empty").exists(),
      ];
    }
  }
};
