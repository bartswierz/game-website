import { GameDetails } from "@/types";
import { getGameDetails } from "@/utils";
import { Ratings } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";

// DISPLAY GAME DETAILS FOR A SINGLE GAME BASED ON ID
const GameDetailsPage = async ({ params }: { params: { id: string } }) => {
  const gameDetails: GameDetails = await getGameDetails(params.id);
  const { id, name, background_image, description, released, rating, ratings, ratings_count, stores, tags } = gameDetails;

  // const descriptionFormatted = description.split("<br />");
  // const replacedText = description.replace(/<br \/>|<\/?p>/g, "\n\n");
  // const paragraphs = replacedText.split("\n\n");

  // const formatDescription = (description: string) => {
  //   const replacedText = description.replace(/<br \/>|<\/?p>/g, "\n\n");
  //   const paragraphs = replacedText.split("\n\n");

  //   return paragraphs;
  // };

  // const formatDescription = (description: string) => {
  //   const splitByPTag: string[] = description.split("<p>"); // splitByPTag[1] holds the english description
  //   // console.log("splitByPTag: ", splitByPTag);
  //   // console.log("splitByPTag.length: ", splitByPTag.length);
  //   // console.log("splitByPTag[1]: ", splitByPTag[1]);
  //   const splitByBRTag: string[] = splitByPTag[1].split("<br />");
  //   console.log("splitByBRTag: ", splitByBRTag);
  //   // const descriptionSplitByBreakTag = console.log("descriptionSplitByParagraphs: ", descriptionSplitByParagraphs);
  //   const replacedText = description.replace(/<br \/>|<\/?p>/g, "\n\n");
  //   // const paragraphs = replacedText.split("\n\n");

  //   return splitByBRTag;
  // };

  const formatDescription = (description: string) => {
    const splitByPTag: string[] = description.split("</p>"); // splitByPTag[0] = english description, splitByPTag[1] = Spanish description
    console.log("splitByPTag: ", splitByPTag);
    let englishDescription = splitByPTag[0].replace(/<p>/g, "");
    let englishDescriptionList = englishDescription.split("<br />");
    console.log("englishDescription: ", englishDescription);
    // console.log("splitByPTag.length: ", splitByPTag.length);
    // console.log("splitByPTag[1]: ", splitByPTag[1]);
    // const splitByBRTag: string[] = splitByPTag[1].split("<br />");
    // console.log("splitByBRTag: ", splitByBRTag);
    // const descriptionSplitByBreakTag = console.log("descriptionSplitByParagraphs: ", descriptionSplitByParagraphs);
    const replacedText = description.replace(/<br \/>|<\/?p>/g, "\n\n");
    // const paragraphs = replacedText.split("\n\n");

    return englishDescriptionList;
  };

  const descriptionText: string[] = formatDescription(description);
  // console.log("descriptionFormatted: ", descriptionFormatted);
  // console.log("Game Details Page - params: ", params);
  // console.log("Tags: ", tags);

  return (
    <div className="border bg-gray-800 text-white">
      <div>
        <Image src={background_image} alt={name} width={300} height={200} />
      </div>

      <div className="p-2">
        <ul>
          <li>Game Id: {id}</li>
          <li>{name}</li>
          <li>Released: {released}</li>
          <li>
            {descriptionText.map((sentence) => (
              <p className="mb-2">{sentence}</p>
            ))}
          </li>
          <li>
            Rating: {rating} ({ratings_count})
          </li>

          <Ratings averageRating={rating} ratingsList={ratings} ratingsCount={ratings_count} />
        </ul>

        {/* TAGS */}
        <ul className="flex flex-row flex-wrap gap-2 text-xs">
          {tags.map(({ id, name, slug, image_background }) => (
            <li key={id} className="bg-blue-700 py-1 px-2  rounded-lg">
              {name}
            </li>
          ))}
        </ul>

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
