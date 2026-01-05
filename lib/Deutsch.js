import sql from "better-sqlite3";
const DB = sql("deutsch.db");

export function fetchAllDataSatz() {
  return DB.prepare("select * from deutsch_table").all();
}
export function fetchAllDataVerbs() {
  return DB.prepare("select * from verb_table").all();
}
// export function fetchDataSatz(id) {
//   return DB.prepare("SELECT * FROM deutsch_table WHERE id = ?").get(id);
// }
const getSatzStmt = DB.prepare("SELECT * FROM deutsch_table WHERE id = ?");
export function fetchDataSatz(id) {
  return getSatzStmt.get(id);
}
export function saveSatz(satz) {
  const title = (satz?.title || "").trim();
  const text = (satz?.text || "").trim();
  const tables = (satz?.tables || satz?.tables || "").trim();
  const special = (satz?.special || "").trim();
  if (!title && !text && !tables && !special) {
    throw new Error("Mindestens eines der Felder muss ausgefüllt sein.");
  }
  const stmt = DB.prepare(`
    INSERT INTO deutsch_table (title, text, tables, special)
    VALUES (@title, @text, @tables, @special)
  `);
  const info = stmt.run({
    title,
    text,
    tables,
    special,
  });
  return {
    id: info.lastInsertRowid,
    changes: info.changes,
  };
}
export function saveVerbs(verbs) {
  const title = (verbs?.title || "").trim();
  const Präsens = (verbs?.Präsens || "").trim();
  const Präteritum = (verbs?.Präteritum || verbs?.Präteritum || "").trim();
  const Perfekt = (verbs?.Perfekt || "").trim();
  const Futur = (verbs?.Futur || "").trim();
  if (!title && !Präsens && !Präteritum && !Perfekt && !Futur) {
    throw new Error("Mindestens eines der Felder muss ausgefüllt sein.");
  }
  const stmt = DB.prepare(`
    INSERT INTO verb_table (title, Präsens, Präteritum, Perfekt, Futur)
    VALUES (@title, @Präsens, @Präteritum, @Perfekt, @Futur)
  `);
  const info = stmt.run({
    title,
    Präsens,
    Präteritum,
    Perfekt,
    Futur,
  });
  return {
    id: info.lastInsertRowid,
    changes: info.changes,
  };
}

export function updateSatz(id, title) {
  const stmt = DB.prepare(`UPDATE deutsch_table SET title = ? WHERE id = ?`);
  const result = stmt.run(title, Number(id));
  return result;
}

export function updateSatzText(id, text) {
  const trimmedText = (text || "").trim();
  const stmt = DB.prepare(`
    UPDATE deutsch_table 
    SET text = ? 
    WHERE id = ?
  `);
  const result = stmt.run(trimmedText, Number(id));
  return result;
}

export function deleteSatz(id) {
  const stmt = DB.prepare("DELETE FROM deutsch_table WHERE id = ?");
  const result = stmt.run(Number(id));
  return result;
}
