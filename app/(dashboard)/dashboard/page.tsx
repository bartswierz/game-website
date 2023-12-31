import { HomepageLinks } from "@/components/ui";

export default async function Home() {
  return (
    // <main className="m-24 rounded-md grid grid-cols-4 gap-12 w-full">
    <main className="text-white h-full">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-[4vh]">Where Classics and New Games Collide</h1>
      {/* Contains 4 Container Links: Genres, Developers, Platforms, Stores */}
      <HomepageLinks />
    </main>
  );
}
