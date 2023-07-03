import Image from "next/image";
import { getGames } from "@/utils";
import Link from "next/link";

export default async function Home() {
  // const gameData: GameDataProps = await getGames();
  const games = await getGames();
  // console.log("games", games);

  return (
    <main className="m-24 rounded-md grid grid-cols-4 gap-12 w-full">
      {/* SIDEBAR
      <div>Sidebar</div> */}

      {/* GAME CONTENT */}
      {games.map((game) => (
        /* 
          0px to 640px = 1 game per row
          768px and up = 2 games per row
          1024px and up = 3 games per row
        */
        <Link
          //TODO - pass the game content as a param
          href={`/games/${game.id}`}
          className="bg-gray-700 p-8 col-span-4 md:col-span-2 lg:col-span-2 text-white font-bold flex-grow"
          key={game.id}
        >
          <h1>{game.name}</h1>
          <p>Rating: {game.rating}</p>
          {/* <p>{game.added}</p> */}
          <div className="aspect-video relative">
            <Image src={game.background_image} fill className="object-cover rounded-md" alt={game.name} />
          </div>
        </Link>
      ))}
    </main>
  );
}
