// "use client";

import { getGames } from "@/utils";
import Image from "next/image";
// import { GameDataProps } from "@/types";

export default async function Home() {
  // const gameData = await getGames();
  // const games = await getGames();
  // console.log("games", games);

  return (
    // <main className="m-24 rounded-md grid grid-cols-4 gap-12 w-full">
    <main>
      <div className="text-white">
        <div>HOME PAGE</div>
        {/* <div>
          {games.map((game) => (
            <Image src={game.background_image} width={300} height={300} alt="Game Display" />
          ))}
        </div> */}
      </div>
    </main>
  );
}
