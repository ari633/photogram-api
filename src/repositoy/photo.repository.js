export const insertPhoto = (payload) => {
  const db = global.sqlite3;

  const insert =
    "INSERT INTO photo (uuid, caption, file_name, base_url) VALUES (?,?,?,?)";
  return db.run(insert, [
    payload?.uuid,
    payload?.caption,
    payload?.file_name,
    payload?.base_url,
  ]);
};

export const selectPhotos = (limit) => {
  const db = global.sqlite3;

  const sql = "SELECT * FROM photo ORDER by id DESC";

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
