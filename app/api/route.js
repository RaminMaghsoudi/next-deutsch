import { saveSatz, saveVerbs } from "@/lib/Deutsch";

export async function POST(req) {
  const body = await req.json();
  const { table, title, text, Präsens, Präteritum, Perfekt, Futur } = body;
  if (table === "verb") {
    saveVerbs({
      title: title || "",
      Präsens: Präsens || "",
      Präteritum: Präteritum || "",
      Perfekt: Perfekt || "",
      Futur: Futur || "",
    });
  } else {
    saveSatz({
      title: title || "",
      text: text || "",
      tables: "",
      special: "",
    });
  }
  // saveSatz(body);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
