import * as sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite");
    db.run(
      `
      CREATE TABLE photo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        caption TEXT,
        file_name TEXT,
        base_url TEXT
      )
    `,
      (err) => {
        if (err) {
          console.log("Table photo already created");
        }
      }
    );
    db.run(
      `
      CREATE TABLE comment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,
        text TEXT,
        photo_id INTEGER,
        FOREIGN KEY(photo_id) REFERENCES photo(id)
      )
    `,
      (err) => {
        if (err) {
          console.log("Table photo already created");
        }
      }
    );
  }
});
