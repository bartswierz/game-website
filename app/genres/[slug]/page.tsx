"use client";
import { useSearchParams } from "next/navigation";
import { getGamesByGenre } from "@/utils";
import { GamesByGenre } from "@/types";
import { useState, useEffect } from "react";
import { GameLink, LoadMoreGenreGames } from "@/components/ui";
import Loading from "./loading";
//ex. http://localhost:3000/genres/shooter?genres=action&page_size=6
//ex. http://localhost:3000/genres/shooter?genres=4&page_size=6
const GenrePage = async () => {
  // Grabs the ID from the URL
  const searchParams = useSearchParams();
  const searchGenreID = searchParams.get("genres"); // genres=action
  const [content, setContent] = useState<GamesByGenre>();

  // Fetch Genre Info using the passed ID from browse/genres Page
  useEffect(() => {
    //ex searchID for action games is 'action' | 4
    const fetchGamesByGenre = async (searchID: string | number) => {
      const data: GamesByGenre = await getGamesByGenre(searchID);

      if (data) {
        setContent(data);
      } else throw new Error("No data returned from getGenreInfo");
    };

    if (searchGenreID) fetchGamesByGenre(searchGenreID);
  }, [searchGenreID]);

  // const data: GamesByGenre = await getGamesByGenre(searchGenreID);

  // While loading data from API
  if (!content) return <Loading />;

  return (
    <div className="text-white mx-4 xsm:mx-0">
      <div className="text-4xl font-semibold uppercase flex flex-wrap mb-8">
        {searchGenreID} GAMES
        <span className="text-base text-gray-500 ml-2 items-end self-end justify-end">{content.count}+ Games</span>
      </div>

      {content && (
        <div className="grid grid-cols-1 px-2 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4 ">
          {content.results.map(({ slug, name, background_image }) => (
            // Creates a Game Display for each game in the list as a link to the game page
            <div key={slug} className="h-64">
              <GameLink slug={slug} name={name} background_image={background_image} />
            </div>
          ))}
        </div>
      )}

      {/* LOADING ICON AT THE BOTTOM */}
      {searchGenreID && <LoadMoreGenreGames searchQuery={searchGenreID} />}
    </div>
  );
};

export default GenrePage;

// const GenrePage = async () => {
//   // Grabs the ID from the URL
//   const searchParams = useSearchParams();
//   const searchGenreID = searchParams.get("genres"); // genres=action
//   const [content, setContent] = useState<GamesByGenre>();

//   // Fetch Genre Info using the passed ID from browse/genres Page
//   useEffect(() => {
//     //ex searchID for action games is 'action' | 4
//     const fetchGamesByGenre = async (searchID: string | number) => {
//       const data: GamesByGenre = await getGamesByGenre(searchID);

//       if (data) {
//         setContent(data);
//       } else throw new Error("No data returned from getGenreInfo");
//     };

//     if (searchGenreID) fetchGamesByGenre(searchGenreID);
//   }, [searchGenreID]);

//   // While loading data from API
//   if (!content) return <Loading />;

//   return (
//     <div className="text-white mx-4 xsm:mx-0">
//       <div className="text-4xl font-semibold uppercase flex flex-wrap mb-8">
//         {searchGenreID} GAMES
//         <span className="text-base text-gray-500 ml-2 items-end self-end justify-end">{content.count}+ Games</span>
//       </div>

//       {content && (
//         <div className="grid grid-cols-1 px-2 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4 ">
//           {content.results.map(({ slug, name, background_image }) => (
//             // Creates a Game Display for each game in the list as a link to the game page
//             <div key={slug} className="h-64">
//               <GameLink slug={slug} name={name} background_image={background_image} />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* LOADING ICON AT THE BOTTOM */}
//       {searchGenreID && <LoadMoreGenreGames searchQuery={searchGenreID} />}
//     </div>
//   );
// };
