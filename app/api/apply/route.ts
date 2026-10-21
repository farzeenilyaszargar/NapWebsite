export async function POST() {
  return Response.json({ error: "Applications are closed at the moment." }, { status: 410 });
}
