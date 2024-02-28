import { HomepageLinks } from "@/components/ui";
// import { auth } from "@/auth";
export default async function Home() {
  return (
    <main className="text-white h-full">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-[4vh]">Where Classics and New Games Collide</h1>
      {/* Contains 4 Container Links: Genres, Developers, Platforms, Stores */}
      <HomepageLinks />
    </main>
  );
}
