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

  // FORMATS THE ENGLISH GAME DESCRIPTION
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
    <div className="border bg-gray-800 text-white">
      <div>
        <Image src={background_image} alt={name} width={300} height={200} />
      </div>

      <div className="p-2">
        <ul>
          <li>Game Id: {id}</li>
          <li>{name}</li>
          <li>Released: {formattedReleasedDate}</li>
          <li>Updated: {formattedUpdatedDate}</li>
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
    </div>
  );
};

export default GameDetailsPage;
