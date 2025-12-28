const Database = require("better-sqlite3");
const db = new Database("meals.db");

const nd = [
  {
    title: "Pommes oder Salat, Junior?",
    text: "juicy-cheese-burger",
  },
];
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS deutsch_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    text TEXT NOT NULL
  )
`
).run();

const stmt = db.prepare(`
  INSERT INTO deutsch_table (title, text)
  VALUES (@title, @text)
`);

for (const deutsch of nd) {
  stmt.run(meal);
}

console.log("✅ Database initialized successfully");
