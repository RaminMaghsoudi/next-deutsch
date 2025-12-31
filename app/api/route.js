import { saveSatz } from "@/lib/Deutsch";

export async function POST(req) {
  const body = await req.json();
  saveSatz(body);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
