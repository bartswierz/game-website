// Testing ROUTER HANDLERS - Note: WORKS AS LONG AS THERES NO 'page.js' in this route
//http://localhost:3000/blogposts - See in Browser or postman
export async function GET() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return Response.json({ posts });
}

export async function POST(request) {
  // posting a blog post

  return Response.json({ msg: "Hello from POST /blogposts" });
}

export async function DELETE(request) {
  // deleting a blog post
  return Response.json({ msg: "Hello from DELETE /blogposts" });
}
