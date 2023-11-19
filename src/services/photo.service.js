import { body } from "express-validator";
import { insertPhoto, selectPhotos } from "../repositoy/photo.repository";
import { Storage } from "@google-cloud/storage";
import stream from "node:stream";
import * as uuid from "uuid";

const projectId = "test-project-396512";
const bucketName = "photogram88";

export const createNewPhoto = async (payload) => {
  const storage = new Storage({
    projectId,
  });
  const destFileName = uuid.v4() + ".jpg";

  const contents = Buffer.from(payload.image, "base64");
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(destFileName);

  const passthroughStream = new stream.PassThrough();
  passthroughStream.write(contents);
  passthroughStream.end();

  async function streamFileUpload() {
    passthroughStream.pipe(file.createWriteStream());
    console.log(`${destFileName} uploaded to ${bucketName}`);
  }

  streamFileUpload().catch((err) => {
    throw new Error("FAILED TO UPLOAD");
  });
  return insertPhoto({
    uuid: uuid.v4(),
    caption: payload?.caption,
    file_name: destFileName,
    base_url: file.storage.apiEndpoint + "/" + bucketName,
  });
};

export const getAllPhotos = () => {
  return selectPhotos();
};

export const validate = (method) => {
  switch (method) {
    case "createPhoto": {
      return [
        body("caption", "Caption cannot empty").exists(),
        body("image", "Image cannot empty").exists(),
      ];
    }
  }
};
