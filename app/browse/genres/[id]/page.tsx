// "use client";
// import { useSearchParams } from "next/navigation";
// import { getGenreInfo } from "@/utils";
// import { GenreInfo } from "@/types";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// // const GenrePage = async ({ params }: { params: { slug: string; query: { id: string } } }) => {
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
//               {/* NAVIGATES USER TO INDIVIDUAL GENRE PAGE - ex. /genres/action */}
//               <Link
//                 href={{
//                   pathname: `/genres/${genreInfo.name.toLowerCase()}`,
//                   query: { genres: `${genreInfo.name.toLowerCase()}`, page_size: 6 },
//                 }}
//                 className="underline"
//               >
//                 {/* <Link href={`/genres/?genres=${genreInfo.name.toLowerCase()}`} className="underline"> */}
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

// // PREVIOUS
// // const BrowseGenre = async () => {
// //   return <div className="text-white">INDIVIDUAL GENRE</div>;
// // };

// // export default BrowseGenre;
