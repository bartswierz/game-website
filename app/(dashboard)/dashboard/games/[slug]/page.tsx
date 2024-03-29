import { GameDetails, GameScreenshots, StoresWithGame } from "@/types";
import { findStoresForGame, getGameDetails, getGameScreenshots } from "@/utils";
import { Ratings, ShowMore, WordList } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { addGameToFavorites } from "@/lib/actions";
import AddGameToFavoritesBtn from "@/components/ui/AddGameToFavoritesBtn";
// DISPLAY GAME DETAILS FOR A SINGLE GAME BASED ON ID
const GameDetailsPage = async ({ params }: { params: { slug: string } }) => {
  // FOR SKELETON LOADING DEVELOPMENT PURPOSES
  // if (params.slug) return <Loading />;

  //We are using the passed slug(i.e. 'rocket-league' in this case) to get the game details from the API
  const gameDetails: GameDetails = await getGameDetails(params.slug);

  //Passing slug to get the game screenshots from the API
  const gameScreenshots: GameScreenshots = await getGameScreenshots(params.slug);

  // Destructuring results from the StoresWithGame object upon return from the API
  const { results: gameStoreList }: StoresWithGame = await findStoresForGame(params.slug);

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
    // background_image,
    description,
    // description_raw,
    developers,
    esrb_rating,
    genres,
    id,
    metacritic,
    // metacritic_platforms,
    metacritic_url,
    name,
    // platforms,
    publishers,
    rating,
    ratings,
    ratings_count,
    // reddit_description,
    // reddit_name,
    reddit_url,
    released,
    // stores,
    tags,
    updated,
    website,
  } = gameDetails;

  // const descriptionText: string[] = formatDescription(description);

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
    if (!released) return "N/A";

    const dateValue = released.split("-"); // ["2023", "07", "13"]
    const date = dateValue[1] + "/" + dateValue[2] + "/" + dateValue[0]; // "07/13/2023"

    return date;
  };

  const formattedReleasedDate = formatReleasedDate(released);

  return (
    <div className="w-full xsm:container">
      <div className="text-white flex flex-row gap-8 max-w-[1500px]">
        {/* LEFT COLUMN */}
        <div className="p-4 flex-[60]">
          <div className="flex flex-col gap-4 w-full">
            <div>
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
              <h2 className="text-4xl font-bold mt-2">
                {name} <span className="text-gray-500 text-base">#{id}</span>
              </h2>

              {/* <button className="bg-blue-500 text-white px-4 py-2" onClick={() => addGameToFavorites()}>
                Add Game To Favorites
              </button> */}
              {/* <AddGameToFavoritesBtn /> */}
            </div>

            {/* SCREENSHOTS */}
            <div className="grid grid-cols-1 xsm:grid-cols-2 gap-4 lg:hidden">
              {gameScreenshots.results.map(({ id, image }) => (
                <div className="h-32" key={id}>
                  <Image src={image} alt={name} width={300} height={200} className="rounded-lg w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* ABOUT/DESCRIPTION */}
            <h2 className="text-3xl font-bold">About</h2>
            <div className="flex flex-col gap-6 w-full">
              <ShowMore text={description} />
            </div>

            {/* CONTAINER HOLDING: Platforms, Metascore, Genre, Release Date, Developer, Publisher, Age Rating, Other game in the series, Tags, Website */}
            <div className="flex flex-row flex-wrap mt-8 gap-4">
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
                {genres.length === 0 ? "N/A" : <WordList stringList={genres} />}
              </div>

              {/* RELEASE DATE */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Release Date</h2>
                <span>{formattedReleasedDate}</span>
              </div>

              {/* DEVELOPER */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Developers</h2>
                <WordList stringList={developers} />
              </div>

              {/* PUBLISHER */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Publishers</h2>
                {publishers.length === 0 ? "N/A" : <WordList stringList={publishers} />}
              </div>

              {/* AGE RATING */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Age Rating</h2>
                {esrb_rating ? <span>{esrb_rating.name === "Mature" ? `17+ ${esrb_rating.name}` : esrb_rating.name}</span> : "N/A"}
              </div>

              {/* TAGS */}
              <div>
                <h2 className="text-gray-500 font-semibold mb-2">Tags</h2>
                {tags.length === 0 ? "N/A" : <WordList stringList={tags} />}
              </div>

              {/* WEBSITE */}
              <div className="w-full">
                <h2 className="text-gray-500 font-semibold mb-2">Websites</h2>
                <div className="flex flex-wrap gap-2 pr-2 ">
                  <Link
                    href={website}
                    className="overflow-ellipsis w-max px-2 py-1 text-sm font-semibold rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                    target="_blank"
                  >
                    Publisher Site
                  </Link>

                  {reddit_url && (
                    <Link
                      href={reddit_url}
                      target="_blank"
                      className="overflow-ellipsis w-max px-2 py-1 text-sm font-semibold rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Reddit Game Discussion
                    </Link>
                  )}

                  {metacritic_url && (
                    <Link
                      href={metacritic_url}
                      className="overflow-ellipsis w-max px-2 py-1 text-sm font-semibold rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                      target="_blank"
                    >
                      Metacritic Game Review
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <br />
          {/* AVAILABLE STORES */}
          <div>
            <h2 className="text-gray-500 font-semibold mb-2">Available Stores</h2>
            <div className="flex flex-row flex-wrap gap-2">
              {/* Displays list of stores if available, otherwise displays N/A */}
              {gameStoreList.length !== 0
                ? gameStoreList.map(({ id, game_id, store_id, url }) => (
                    <Link
                      href={url}
                      target="_blank"
                      // className=" text-gray-200 font-semibold text-base hover:text-slate-500"
                      className="w-max text-sm font-semibold rounded-md py-1 px-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                      key={id}
                    >
                      {getStoreNameById(store_id)}
                    </Link>
                  ))
                : "N/A"}
            </div>
          </div>

          {/* rating, ratings, ratings_count, */}
          {/* RATINGS */}
          <Ratings averageRating={rating} ratingsList={ratings} ratingsCount={ratings_count} />
        </div>

        {/* SCREENSHOTS - RIGHT COLUMN */}
        <div className="hidden lg:block flex-[30]">
          <div className="grid grid-cols-1 3xl:grid-cols-2 gap-4">
            {gameScreenshots.results.map(({ id, image }) => (
              <div className="h-36 max-w-96" key={id}>
                <Image src={image} alt={name} width={300} height={200} className="rounded-lg w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
