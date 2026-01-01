// Updated: lib/Deutsch.js (Correct the typo in filename if needed, and ensure functions are correct)
import sql from "better-sqlite3";
const DB = sql("deutsch.db");

export function fetchAllDataSatz() {
  return DB.prepare("select * from deutsch_table").all();
}
export function fetchDataSatz(id) {
  return DB.prepare("SELECT * FROM deutsch_table WHERE id = ? ").get(id);
}
export function saveSatz(satz) {
  DB.prepare(
    `INSERT INTO deutsch_table
    (title,text) VALUES(
        @title,
        @text
        )`
  ).run(satz);
}

export function updateSatz(id, title) {
  const stmt = DB.prepare(`UPDATE deutsch_table SET title = ? WHERE id = ?`);
  const result = stmt.run(title, Number(id));
  return result;
}

export function deleteSatz(id) {
  const stmt = DB.prepare("DELETE FROM deutsch_table WHERE id = ?");
  const result = stmt.run(Number(id));
  return result;
}
