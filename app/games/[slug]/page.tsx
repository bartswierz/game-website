import { GameDetails } from "@/types";
import { getGameDetails } from "@/utils";
import { Ratings } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";

// DISPLAY GAME DETAILS FOR A SINGLE GAME BASED ON ID
const GameDetailsPage = async ({ params }: { params: { slug: string } }) => {
  console.log("params.slug: ", params);
  const gameDetails: GameDetails = await getGameDetails(params.slug);

  // Destructuring props from GameDetails
  const {
    id,
    name,
    background_image,
    description,
    released,
    updated,
    rating,
    ratings,
    ratings_count,
    stores,
    tags,
    reddit_url,
    reddit_name,
    reddit_description,
    metacritic,
    metacritic_platforms,
  } = gameDetails;

  // FORMATS THE ENGLISH GAME DESCRIPTION - TODO UPDATE THIS
  const formatDescription = (description: string) => {
    const splitByPTag: string[] = description.split("</p>"); // splitByPTag[0] = english description, splitByPTag[1] = Spanish description
    // console.log("splitByPTag: ", splitByPTag);

    let englishDescription = splitByPTag[0].replace(/<p>/g, "");
    let englishDescriptionList = englishDescription.split("<br />");
    // console.log("englishDescription: ", englishDescription);

    return englishDescriptionList;
  };

  const descriptionText: string[] = formatDescription(description);

  // FORMATS UPDATED DATE TO MM/DD/YYYY
  const formatUpdatedDate = (updated: string) => {
    const dateTimeString = updated; // "2023-07-13T06:44:16"
    const dateTime = new Date(dateTimeString);
    const formattedDateTime = dateTime.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }); //07/10/2023

    return formattedDateTime;
  };

  const formattedUpdatedDate = formatUpdatedDate(updated);

  // FORMATS RELEASED DATE TO MM/DD/YYYY
  const formatReleasedDate = (released: string) => {
    const dateValue = released.split("-"); // ["2023", "07", "13"]
    const date = dateValue[1] + "/" + dateValue[2] + "/" + dateValue[0]; // "07/13/2023"

    return date;
  };

  const formattedReleasedDate = formatReleasedDate(released);

  return (
    <div className="border bg-gray-800 text-white flex flex-row flex-auto gap-12">
      {/* LEFT COLUMN */}
      <div className="p-2 flex-[60] border-2 border-red-500">
        <div className="flex flex-col gap-4">
          {/* RELEASED */}
          <span className="bg-gray-200 text-gray-500 text-base font-semibold py-1 px-2 rounded-lg w-max">
            Released {formattedReleasedDate}
          </span>

          {/* GAME TITLE & GAME ID */}
          <h2 className="text-4xl font-bold">
            {name} <span className="text-gray-500 text-base">#{id}</span>
          </h2>

          {/* UPDATED */}
          <span className="bg-gray-200 text-gray-500 text-base font-semibold py-1 px-2 rounded-lg w-max">
            Updated {formattedUpdatedDate}
          </span>

          {/* DESCRIPTION */}

          <h2 className="text-3xl font-bold">About</h2>
          <div className="flex flex-col gap-6">
            {descriptionText.map((sentence) => (
              <p className="border">{sentence}</p>
            ))}
          </div>

          {/* RATING */}
          <li>
            Rating: {rating} ({ratings_count})
          </li>

          <Ratings averageRating={rating} ratingsList={ratings} ratingsCount={ratings_count} />

          {/* CONTAINER HOLDING: Platforms, Metascore, Genre, Release Date, Developer, Publisher, Age Rating, Other game in the series, Tags, Website */}
          <div className="flex flex-row flex-wrap border ">
            {/* PLATFORMS */}
            <div className="m-2">
              <h2 className="text-gray-500 font-semibold">Platforms</h2>
              <ul>
                <li>Xbox Series S/X</li>
              </ul>
            </div>

            {/* METASCORE */}
            <div></div>
          </div>
        </div>

        {/* TAGS */}
        <ul className="flex flex-row flex-wrap gap-2 text-xs">
          {tags.map(({ id, name, slug }) => (
            <li key={id} className="bg-blue-700 py-1 px-2  rounded-lg">
              {name}
            </li>
          ))}
        </ul>

        <br />

        {/* AVAILABLE STORES */}
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

        {/* REDDIT SECTION */}
        <div>
          <h1 className="text-xl mb-1 mt-5">Reddit Information</h1>
          <Link href={reddit_url} target="_blank">
            Reddit URL: <span className="underline">{reddit_url}</span>
          </Link>
          <p>Reddit Name: {reddit_name}</p>
          <p>Reddit Description: {reddit_description}</p>
        </div>

        {/* METACRITIC */}
        <div>
          <h1 className="text-xl mt-2">Metascore Information</h1>
          <p>Metacritic Score: {metacritic}</p>

          {/* METACRITIC PLATFORMS */}
          <div>
            {metacritic_platforms.length !== 0 ? (
              metacritic_platforms.map(({ metascore, url, platform }) => (
                <div className="my-2">
                  <p>
                    {platform.name} - Metascore: {metascore}
                  </p>
                  <Link href={url} target="_blank">
                    Metascore URL: <span className="underline">{url}</span>
                  </Link>
                </div>
              ))
            ) : (
              <p>Metacritic Platform Information Unavailable...</p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex-[40] bg-gray-500 border-2 border-green-500">
        <Image src={background_image} alt={name} width={300} height={200} />
      </div>
    </div>
  );
};

export default GameDetailsPage;
