"use client";
import { useSearchParams } from "next/navigation";
import { getGamesByGenre } from "@/utils";
import { GamesByGenre } from "@/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// TODO - GRAB THE SLUG PASSED AND USE IT TO GET THE GENRE GAMES LIST - EX. browse/genres/[action] -> slug = action
// const GenrePage = async ({ params }: { params: { slug: string } }) => {
const GenrePage = async () => {
  // console.log("APP/GENRES/[SLUG]/PAGE.TSX - params: ", params);
  // Grabs the ID from the URL
  const searchParams = useSearchParams();
  const searchGenreID = searchParams.get("genres");
  const searchPageSize = searchParams.get("page_size");
  console.log("searchGenre = ", searchGenreID);
  console.log("searchPageSize = ", searchPageSize);
  const [gamesInfo, setGamesInfo] = useState<GamesByGenre>();

  // Fetch Genre Info using the passed ID from browse/genres Page
  useEffect(() => {
    //ex searchID for action games is 'action' | 4
    const fetchGamesByGenreInfo = async (searchID: string | number, searchPageSize: string | null) => {
      const data: GamesByGenre = await getGamesByGenre(searchID, searchPageSize);

      if (data) {
        console.log("GAMES BY GENRE - data: ", data);
        setGamesInfo(data);
      } else throw new Error("No data returned from getGenreInfo");
    };

    if (searchGenreID) fetchGamesByGenreInfo(searchGenreID, searchPageSize);
  }, [searchGenreID]);

  return (
    <div className="border text-white">
      <div>APP - GENRES PAGE - INFO PASSED BELOW</div>
      <div>
        {gamesInfo && (
          <ul>
            <li>Games Page: {gamesInfo.count}</li>
            <li>Next: {gamesInfo.next}</li>
            <li>Previous: {gamesInfo.previous}</li>
            {/* <li>
              Results:
              {gamesInfo.results.map(({ slug, name, platforms }) => {
                return (
                  <div>
                    <p>{slug}</p>
                    <p>{name}</p>
                  </div>
                );
              })}
            </li> */}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GenrePage;

// "use client";
// import { useSearchParams } from "next/navigation";
// import { getGenreInfo } from "@/utils";
// import { GenreInfo } from "@/types";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// TODO - GRAB THE SLUG PASSED AND USE IT TO GET THE GENRE GAMES LIST - EX. browse/genres/[action] -> slug = action
// const GenrePage = async ({ params }: { params: { slug: string; query: { id: string } } }) => {
// const GenrePage = async () => {
//   // Grabs the ID from the URL
//   const searchParams = useSearchParams();
//   const searchID = searchParams.get("id");
//   const [genreInfo, setGenreInfo] = useState<GenreInfo>();

//   // Fetch Genre Info using the passed ID from browse/genres Page
//   useEffect(() => {
//     const fetchGenreInfo = async (searchID: string) => {
//       const data: GenreInfo = await getGenreInfo(searchID);

//       if (data) {
//         // console.log("data: ", data);
//         setGenreInfo(data);
//       } else throw new Error("No data returned from getGenreInfo");
//     };

//     if (searchID) fetchGenreInfo(searchID);
//   }, [searchID]);

//   const removeTags = (description: string): string[] => {
//     // Removes <p> & </p>
//     const removeParagraphTags = description.replace(/<\/?p>/g, "");

//     const replaceHex = removeParagraphTags.replace(/&#39;/g, "'");

//     const splitAtBreakTags = replaceHex.split("<br />");
//     return splitAtBreakTags;
//   };
//   // const genreInfo: GenreInfo = await getGenreInfo(searchID);

//   // console.log("genreInfo: ", genreInfo);
//   // console.log("Genre search ID: ", search);
//   // console.log("Genre params: ", params.query.id);

//   return (
//     <div className="border text-white">
//       <div>APP - GENRES PAGE - INFO PASSED BELOW</div>
//       {genreInfo && (
//         <div>
//           <div>
//             <Image src={genreInfo.image_background} width={300} height={300} alt="Genre" />
//           </div>
//           <ul key={genreInfo.id} className="p-2">
//             <li>{genreInfo.name}</li>
//             <li>Total Games: {genreInfo.games_count}</li>
//             <li>
//               <h2 className="text-xl">Description:</h2>
//               {removeTags(genreInfo.description).map((sentence, idx) => (
//                 <p key={idx} className="my-2">
//                   {sentence}
//                 </p>
//               ))}
//             </li>
//             <li>
//               <Link href={`/genres/${genreInfo.name}`} className="underline">
//                 View {genreInfo.name} Games
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GenrePage;
