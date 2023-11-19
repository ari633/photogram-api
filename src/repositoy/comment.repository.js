export const selectCommentByPhotoId = (photoId) => {
  const db = global.sqlite3;

  const sql = "SELECT * FROM comment where photo_id = ?";

  return new Promise((resolve, reject) => {
    db.all(sql, [photoId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const insertComment = (payload) => {
  const db = global.sqlite3;

  const insert = "INSERT INTO comment (uuid, photo_id, text) VALUES (?,?,?)";
  return db.run(insert, [payload?.uuid, payload?.photo_id, payload?.text]);
};
