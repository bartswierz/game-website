import { GameDetails } from "@/types";
import { getGameDetails } from "@/utils";
import Link from "next/link";

// DISPLAY GAME DETAILS FOR A SINGLE GAME BASED ON ID
const GameDetailsPage = async ({ params }: { params: { id: string } }) => {
  const gameDetails: GameDetails = await getGameDetails(params.id);
  const { id, name, released, rating, reviews_count, stores, tags } = gameDetails;

  console.log("Game Details Page - params: ", params);
  console.log("Tags: ", tags);

  return (
    <div className="text-white">
      {/* <div>Game Details Page - Slug: {params.id}</div> */}
      <div>
        {/* {gameDetails.map(({ id, name, released, rating, reviews_count, stores }: GameDetails) => ( */}
        <div className="border bg-gray-700">
          <div>id: {id}</div>
          <div>name: {name}</div>
          <div>released: {released}</div>
          <div>rating: {rating}</div>
          <div>reviews_count: {reviews_count}</div>
          <div>
            tags:{" "}
            {tags.map(({ id, name, slug, language, games_count, image_background }) => (
              <div>
                {/* <div key={id}> */}
                <div>{name}</div>
                <div>{language}</div>
                <div>{image_background}</div>
              </div>
            ))}
          </div>
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
        {/* ))} */}
      </div>
    </div>
  );
};

export default GameDetailsPage;

// import { GameDetails } from "@/types";
// import { getGameDetails } from "@/utils";
// import Link from "next/link";

// // DISPLAY GAME DETAILS FOR A SINGLE GAME BASED ON ID
// const GameDetailsPage = async ({ params }: { params: { id: string } }) => {
//   const gameDetails = await getGameDetails(params.id);
//   console.log("Game Details Page - params: ", params);
//   return (
//     <div className="text-white">
//       {/* <div>Game Details Page - Slug: {params.id}</div> */}
//       <div>
//         {gameDetails.map(({ id, name, released, rating, reviews_count, stores }: GameDetails) => (
//           <div className="border bg-gray-700">
//             <div>id: {id}</div>
//             <div>name: {name}</div>
//             <div>released: {released}</div>
//             <div>rating: {rating}</div>
//             <div>reviews_count: {reviews_count}</div>
//             <br />
//             <div>
//               Available at Stores:
//               {stores.map(({ store }) => (
//                 <div key={store.id}>
//                   {/* <div>{store.name}</div> */}
//                   <Link href={`https://${store.domain}`} target="_blank" className="underline hover:text-slate-500">
//                     {store.domain}
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GameDetailsPage;
