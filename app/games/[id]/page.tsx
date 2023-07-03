// "use client";

import { GameDetails } from "@/types";
import { getGameDetails } from "@/utils";
import Link from "next/link";

// DISPLAY GAME DETAILS FOR A SINGLE GAME BASED ON ID
const GameDetailsPage = async ({ params }: { params: { id: string; game: GameDetails } }) => {
  const gameDetails = await getGameDetails(params.id);
  console.log("params: ", params);
  return (
    <div className="text-white">
      {/* <div>Game Details Page - Slug: {params.id}</div> */}
      <div>
        {gameDetails.map(({ id, name, released, rating, reviews_count, stores }: GameDetails) => (
          <div className="border bg-gray-700">
            <div>id: {id}</div>
            <div>name: {name}</div>
            <div>released: {released}</div>
            <div>rating: {rating}</div>
            <div>reviews_count: {reviews_count}</div>
            <br />
            <div>
              Available at Stores:
              {stores.map(({ store }) => (
                <div key={store.id}>
                  {/* <div>{store.name}</div> */}
                  <Link href={`https://${store.domain}`} target="_blank" className="underline hover:text-slate-500">
                    {store.domain}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameDetailsPage;
