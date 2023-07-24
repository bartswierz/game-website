import Image from "next/image";
import { getGames } from "@/utils";
import Link from "next/link";
import Searchbar from "@/components/ui/Searchbar";
import { AdvancedSidebar } from "@/components/ui";

export default async function Home() {
  // const gameData: GameDataProps = await getGames();
  // const games = await getGames();
  // console.log("games", games);

  return (
    // <main className="m-24 rounded-md grid grid-cols-4 gap-12 w-full">
    <main>
      {/* SIDEBAR
      <div>Sidebar</div> */}
      <div className="text-white border">
        <div>Inside App Home</div>
        {/* <AdvancedSidebar /> */}
      </div>
      {/* <div className="m-24 rounded-md grid grid-cols-4 gap-12 w-full"> */}
    </main>
  );
}
