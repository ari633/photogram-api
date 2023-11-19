import { createNewPhoto, getAllPhotos } from "../services/photo.service";
import { validationResult } from "express-validator";

export const getPhotos = async (req, res) => {
  const photos = await getAllPhotos();
  res.send({
    status: "OK",
    data: photos,
  });
};

export const createPhoto = async (req, res, next) => {
  const { body } = req;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    await createNewPhoto(body);
    res.send({
      status: "OK",
      data: [],
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
