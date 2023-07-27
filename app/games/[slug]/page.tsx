import { GameDetails, GameScreenshots, Platforms, StoresWithGame } from "@/types";
import { findStoresForGame, getGameDetails, getGameScreenshots } from "@/utils";
import { Ratings } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";

// DISPLAY GAME DETAILS FOR A SINGLE GAME BASED ON ID
const GameDetailsPage = async ({ params }: { params: { slug: string } }) => {
  //We are using the passed slug(i.e. 'rocket-league' in this case) to get the game details from the API
  const gameDetails: GameDetails = await getGameDetails(params.slug);

  //Passing slug to get the game screenshots from the API
  const gameScreenshots: GameScreenshots = await getGameScreenshots(params.slug);

  // Destructuring results from the StoresWithGame object upon return from the API
  const { results: gameStoreList }: StoresWithGame = await findStoresForGame(params.slug);
  console.log("storesWithGame in component: ", gameStoreList);

  const getStoreNameById = (store_id: number) => {
    switch (store_id) {
      case 1:
        return "Steam Store";
      case 2:
        return "Xbox Store";
      case 3:
        return "Playstation Store";
      case 4:
        return "App Store";
      case 5:
        return "GOG Store";
      case 6:
        return "Nintendo Store";
      case 7:
        return "Xbox 360 Store";
      case 8:
        return "Google Play Store";
      case 9:
        return "itch.io Store";
      case 11:
        return "Epic Games Store";
      default:
        break;
    }
  };

  // Destructuring props from GameDetails
  const {
    background_image,
    description,
    description_raw,
    developers,
    esrb_rating,
    genres,
    id,
    metacritic,
    metacritic_platforms,
    metacritic_url,
    name,
    platforms,
    publishers,
    rating,
    ratings,
    ratings_count,
    reddit_description,
    reddit_name,
    reddit_url,
    released,
    stores,
    tags,
    updated,
    website,
  } = gameDetails;

  const getMinRequirements = (platforms: Platforms[]) => {
    console.log("inside getMinRequirements");
    platforms.filter((platform) => {
      console.log("platform.requirements", platform.requirements);
      // return platform.name === "PC";
    });
  };

  getMinRequirements(platforms);
  // console.log("platforms: ", platforms);

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
    <div className="container">
      <div className="border text-white flex flex-row flex-auto gap-8 max-w-[1200px]">
        {/* LEFT COLUMN */}
        <div className="p-2 flex-[60]  w-1/3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {/* RELEASED */}
              <span className="bg-gray-200 text-gray-500 text-base font-semibold py-1 px-2 rounded-lg w-max">
                Released {formattedReleasedDate}
              </span>

              {/* UPDATED */}
              <span className="bg-gray-200 text-gray-500 text-base font-semibold py-1 px-2 rounded-lg w-max">
                Updated {formattedUpdatedDate}
              </span>
            </div>

            {/* GAME TITLE & GAME ID */}
            <h2 className="text-4xl font-bold">
              {name} <span className="text-gray-500 text-base">#{id}</span>
            </h2>

            {/* ABOUT/DESCRIPTION */}
            <h2 className="text-3xl font-bold">About</h2>
            <div className="flex flex-col gap-6">
              {descriptionText.map((sentence) => (
                <p className="border">{sentence}</p>
              ))}
              {/* {description_raw} */}
            </div>

            {/* CONTAINER HOLDING: Platforms, Metascore, Genre, Release Date, Developer, Publisher, Age Rating, Other game in the series, Tags, Website */}
            <div className="flex flex-row flex-wrap mt-8 border gap-4">
              {/* PLATFORMS */}
              <div className="">
                <h2 className="text-gray-500 font-semibold mb-2">Platforms</h2>
                <ul>
                  <li>Xbox Series S/X</li>
                </ul>
              </div>

              {/* METASCORE */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Metascore</h2>
                {metacritic ? (
                  <span className="border border-[rgba(109,200,73,.4)] text-[#6dc849] py-1 px-2 rounded-md">{metacritic}</span>
                ) : (
                  "N/A"
                )}
              </div>

              {/* GENRES */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Genre</h2>
                <ul className="flex flex-row">
                  {genres.map(({ id, name }) => (
                    <li key={id} className="pr-2">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RELEASE DATE */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Release Date</h2>
                <span>{formattedReleasedDate}</span>
              </div>

              {/* DEVELOPER */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Developer</h2>
                <ul>
                  {developers.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>

              {/* PUBLISHER */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Publisher(s)</h2>
                <ul>
                  {publishers.map(({ id, name }) => (
                    <li key={id} className="pr-2">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AGE RATING */}
              {/* <div>
                <h2 className="text-gray-500 font-semibold mb-2">Age Rating</h2>
                {esrb_rating.name && <span>{esrb_rating.name === "Mature" ? `17+ ${esrb_rating.name}` : esrb_rating.name}</span>}
              </div> */}

              {/* TAGS */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Tags</h2>
                <ul className="flex flex-row flex-wrap">
                  {tags.map(({ id, name, slug }) => (
                    <li key={id} className="pr-2">
                      {name},
                    </li>
                  ))}
                </ul>
              </div>

              {/* WEBSITE */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Website(s)</h2>
                <div className="flex flex-col gap-2">
                  <Link href={website} className="underline" target="_blank">
                    {website}
                  </Link>

                  <Link href={reddit_url} target="_blank" className="underline">
                    {reddit_url}
                  </Link>

                  {metacritic_url && (
                    <Link href={metacritic_url} className="underline" target="_blank">
                      {metacritic_url}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <br />

          {/* AVAILABLE STORES */}
          <div>
            <h2 className="text-gray-500 mb-2">Available Stores</h2>
            <div className="flex flex-row flex-wrap gap-2">
              {gameStoreList.map(({ id, game_id, store_id, url }) => (
                <Link
                  href={url}
                  target="_blank"
                  // className=" text-gray-200 font-semibold text-base hover:text-slate-500"
                  className="bg-gray-200 text-gray-500 text-sm font-semibold rounded-md py-1 px-2 hover:bg-gray-300 w-max"
                  key={id}
                >
                  {/* {url} */}
                  {getStoreNameById(store_id)}
                </Link>
              ))}
            </div>
          </div>

          {/* RATING */}
          <div>
            <li>
              Rating: {rating} ({ratings_count})
            </li>

            <Ratings averageRating={rating} ratingsList={ratings} ratingsCount={ratings_count} />
          </div>

          {/* PLATFORM - REQUIREMENTS */}
          <div>
            <h2>Minimum Requirements</h2>
            {/* <p>{platforms.requirements ? platforms.requirements : "N/A"}</p> */}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-[40] border-2 border-green-500">
          {/* <Image src={background_image} alt={name} width={300} height={200} /> */}

          {/* SCREENSHOTS */}
          <div className="flex flex-row flex-wrap gap-4">
            {gameScreenshots.results.map(({ id, image }) => (
              <Image src={image} alt={name} width={300} height={200} key={id} className="rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
