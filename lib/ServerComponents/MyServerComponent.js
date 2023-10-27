// MyServerComponent.js

import { useServerEffect } from "@vercel/fetch";

export default function MyServerComponent({ id }) {
  useServerEffect(async () => {
    // Access the `id` parameter from the URL
    console.log(`ID from URL: ${id}`);
  }, [id]);

  // Return null or your component's content
  return null;
}
