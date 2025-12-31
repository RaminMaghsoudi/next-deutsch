import { deleteSatz, fetchDataSatz, updateSatz } from "@/lib/Deutsch";

export async function GET(request, { params: paramsPromise }) {
  const params = await paramsPromise;
  const id = params.slug;
  const data = fetchDataSatz(id);
  if (!data) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(data);
}

export async function PUT(request, { params: paramsPromise }) {
  const params = await paramsPromise;
  const id = params.slug;
  const body = await request.json();
  updateSatz(id, body.title);
  return Response.json({ success: true });
}

export async function DELETE(request, { params: paramsPromise }) {
  const params = await paramsPromise;
  const id = params.slug;
  const result = deleteSatz(id);
  if (result.changes === 0) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json({ success: true, message: "Deleted successfully" });
}
