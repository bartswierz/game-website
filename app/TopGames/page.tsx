import Image from "next/image";

interface Game {
  id: number;
  background_image: string;
  rating: number;
  name: string;
  games: {}[];
  added: number;
}

const getGames = async (): Promise<Game[]> => {
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // console.log("successful fetch!");
  const data = await res.json();
  // console.log("data", data.results);

  return data.results;
};

export default async function Home() {
  // const gameData: GameDataProps = await getGames();
  const games = await getGames();
  // console.log("games", games);

  return (
    <main className="m-24 rounded-md grid grid-cols-4 gap-12 w-full">
      {/* GAME CONTENT */}
      {games.map((game) => (
        /* 
          0px to 640px = 1 game per row
          768px and up = 2 games per row
          1024px and up = 3 games per row
        */
        <div className="bg-gray-700 p-8 col-span-4 md:col-span-2 lg:col-span-1 text-white font-bold flex-grow" key={game.id}>
          <h1>{game.name}</h1>
          <p>Rating: {game.rating}</p>
          {/* <p>{game.added}</p> */}
          <div className="aspect-video relative">
            <Image src={game.background_image} fill className="object-cover rounded-md" alt={game.name} />
          </div>
        </div>
      ))}
    </main>
  );
}
