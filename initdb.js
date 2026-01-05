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
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS verb_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    Präsens TEXT NOT NULL,
    Präteritum TEXT NOT NULL,
    Perfekt TEXT NOT NULL,
    Futur TEXT NOT NULL
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
const verbSlugs = [
  {
    title: "",
    Präsens: "",
    Präteritum: "",
    Perfekt: "",
    Futur: "",
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

function insertVerbData() {
  const stmt = db.prepare(`
    INSERT INTO verb_table (title, Präsens, Präteritum, Perfekt, Futur)
    VALUES (@title, @Präsens, @Präteritum, @Perfekt, @Futur)
  `);
  let insertedCount = 0;
  for (const verb of verbSlugs) {
    const cleanTitle = (verb.title || "").trim();
    const cleanPräsens = (verb.Präsens || "").trim();
    const cleanPräteritum = (verb.Präteritum || "").trim();
    const cleanPerfekt = (verb.Perfekt || "").trim();
    const cleanFutur = (verb.Futur || "").trim();
    if (
      cleanTitle ||
      cleanPräsens ||
      cleanPräteritum ||
      cleanPerfekt ||
      cleanFutur
    ) {
      stmt.run({
        title: verb.title.trim(),
        Präsens: verb.Präsens.trim(),
        Präteritum: verb.Präteritum.trim(),
        Perfekt: verb.Perfekt.trim(),
        Futur: verb.Futur.trim(),
      });
      insertedCount++;
    }
  }
}

initData();
insertVerbData();
db.close();
