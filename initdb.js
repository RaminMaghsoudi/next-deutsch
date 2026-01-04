const sql = require("better-sqlite3");
const db = sql("deutsch.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS deutsch_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    tables TEXT NOT NULL,
    special TEXT NOT NULL
  )
`
).run();
const deutschSlugs = [
  {
    title: " ",
    text: "",
    tables: "",
    special: "",
  },
];

function initData() {
  const stmt = db.prepare(`
    INSERT INTO deutsch_table (title, text, tables, special)
    VALUES (@title, @text, @tables, @special)
  `);

  let insertedCount = 0;

  for (const ds of deutschSlugs) {
    const cleanTitle = (ds.title || "").trim();
    const cleanText = (ds.text || "").trim();
    const cleanTable = (ds.tables || "").trim();
    const cleanSpecial = (ds.special || "").trim();
    if (cleanTitle || cleanText || cleanTable || cleanSpecial) {
      stmt.run({
        title: cleanTitle,
        text: cleanText,
        tables: cleanTable,
        special: cleanSpecial,
      });
      insertedCount++;
    }
  }
}

initData();
db.close();
