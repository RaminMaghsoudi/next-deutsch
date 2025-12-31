const sql = require("better-sqlite3");
const db = sql("deutsch.db");

const deutschSlugs = [
  {
    title: "",
    text: "",
  },
];

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS deutsch_table (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL ,
       text TEXT NOT NULL
    )
`
).run();
function initData() {
  const stmt = db.prepare(`INSERT INTO deutsch_table VALUES ( @title, @text)`);
  for (const ds of deutschSlugs) {
    const cleanTitle = (ds.title || "").trim();
    const cleanText = (ds.text || "").trim();
    if (cleanTitle || cleanText) {
      stmt.run({
        title: cleanTitle || "",
        text: cleanText || "",
      });
    }
  }
}

initData();
