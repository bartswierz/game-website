//http://localhost:3000/api/hello - See in Browser or postman
export async function GET(request) {
  return new Response("Hello , Next.js!");
}

//http://localhost:3000/api/hello - See in Postman
export async function POST(request) {
  return Response.json({ msg: "Hello from POST route!" });
}
