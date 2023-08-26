"use client";
import { getGamesByGenre, getGamesByDeveloper } from "@/utils";
import { ComboboxOrdering, ComboboxPlatforms, GameLink, LoadMoreGenreGames } from "@/components/ui";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GamesByGenre, GamesByPlatform } from "@/types";
import Loading from "./loading";

//ex. http://localhost:3000/genres/sports?genres=sports
// const GenrePage = async ({ params }: { params: { slug: string } }) => {
//TODO - param is id
// const DeveloperPage = ({ params }: { params: { slug: string } }) => {
const DeveloperPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  // const { slug } = params;
  const { id } = params;
  console.log("params.id: ", params.id);
  // const content = await getGamesByGenre(params.slug);
  // const content = await getGamesByGenre(slug);
  const [content, setContent] = useState<GamesByGenre | null>(null);

  //TODO
  // const searchDevelopers = searchParams.get("genres");
  // const searchDevelopers = searchParams.get("developers");
  const searchDeveloperID = searchParams.get("id");
  console.log("searchDeveloperID: ", searchDeveloperID);
  // const [searchTerm, setSlugTerm] = useState<string | null>(slug);
  // Collects our value inside query passed from Combobox
  const searchOrdering = searchParams.get("ordering");
  // const searchPlatforms = searchParams.get("platforms");
  // const [platforms, setPlatforms] = useState<string | null>(searchPlatforms);
  const [ordering, setOrdering] = useState<string | null>(searchOrdering);
  //TODO - this 'may' not be necessary if all we need is just the id that is passed as a param
  // const [searchSlug, setSearchSlug] = useState<string | null>(searchDevelopers);
  // const [searchSlug, setSearchSlug] = useState<string | null>(id);
  // const [developerID, setDeveloperID] = useState<string | null>(id);
  const [developerID, setDeveloperID] = useState<string | null>(searchDeveloperID);

  //UPDATING ORDERING STATE FROM COMBOBOX, WE WILL PASS IT TO THE COMBOBOX TO BE READY FOR THE NEXT FILTER SEARCH
  useEffect(() => {
    setOrdering(searchOrdering);
  }, [searchOrdering]);

  //UPDATING PLATFORMS STATE FROM COMBOBOX, WE WILL PASS IT TO THE COMBOBOX TO BE READY FOR THE NEXT FILTER SEARCH
  // useEffect(() => {
  //   // User selected a platform, we will update the state so it can be passed to the combobox
  //   setPlatforms(searchPlatforms);
  // }, [searchPlatforms]);

  useEffect(() => {
    // User selected a platform, we will update the state so it can be passed to the combobox
    setDeveloperID(params.id);
  }, [params.id]);
  // useEffect(() => {
  //   // User selected a platform, we will update the state so it can be passed to the combobox
  //   setSearchSlug(searchDevelopers);
  // }, [searchDevelopers]);

  useEffect(() => {
    // const fetchData = async (slug: string) => {
    // const fetchData = async (searchDevelopers: string, searchOrdering?: string, searchPlatforms?: string) => {
    const fetchData = async (searchDeveloperID: string, searchOrdering?: string) => {
      console.log("inside fetchData");
      // value can be null or undefined if user only types in the search box
      // const data: GamesByGenre = await getGamesByGenre(searchDevelopers, searchOrdering, searchPlatforms);
      //TODO - CREATE A getGamesByDeveloper
      // const data: GamesByGenre = await getGamesByGenre(searchDevelopers, searchOrdering, searchPlatforms);
      // const data: GamesByGenre = await getGamesByDeveloper(searchDevelopers, searchOrdering, searchPlatforms);
      //TODO - replace GamesByPlatform with GamesByDeveloper or neutral name if they are similar data structure
      const data: GamesByGenre = await getGamesByDeveloper(searchDeveloperID, searchOrdering);

      if (data) {
        console.log("DATA HAS BEEN FETCHED");
        setContent(data);
      } else throw new Error("No data returned from getGamesSearch");
    };

    if (searchDeveloperID) {
      //IF ORDERING IS SELECTED, PASS BOTH
      if (searchOrdering) fetchData(searchDeveloperID, searchOrdering);
      //NO ORDERING FILTER SET, ONLY PASS THE SEARCH TERM
      else fetchData(searchDeveloperID);
    }
    // }, [searchDevelopers, searchOrdering, searchPlatforms]);
    // }, [searchDevelopers, searchOrdering]);
    // }, [searchDeveloperID, searchOrdering]);
  }, [searchDeveloperID, searchOrdering]);

  if (!content) return <Loading />;
  // if (!content) return <span className="text-white text-3xl">No developer data fetched yet...</span>;

  return (
    <div className="text-white mx-4 xsm:mx-0">
      <div className="flex text-4xl font-semibold mb-6 flex-col sm:flex-row  text-center sm:text-start align-items center">
        <span className="text-xl xsm:text-3xl uppercase">{params.id} GAMES</span>
        <span className="text-base text-gray-500 sm:ml-2 sm:self-end">{content.count}+ Games</span>
      </div>

      {/* http://localhost:3000/genres/action?genres=action */}
      <div className="flex justify-center items-center md:justify-start md:items-start gap-4 my-4">
        <ComboboxOrdering path={`/developer/${params.id}`} genres={params.id} page="developer" />
        {/* {platforms ? (
          <ComboboxOrdering path={`/developer/${params.id}`} platforms={platforms} genres={params.id} page="developer" />
        ) : (
          <ComboboxOrdering path={`/developer/${params.id}`} genres={params.id} page="developer" />
        )}
        <ComboboxPlatforms path={`/developer/${params.id}`} ordering={ordering} genres={params.id} page="developer" /> */}
      </div>

      {content && (
        <div className="grid grid-cols-1 px-2 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4 ">
          {content.results.map(({ slug, name, background_image }) => (
            // Creates a Game Card Link for each game, links user to the Games page -> /games/[slug]
            <div key={slug} className="h-64">
              <GameLink slug={slug} name={name} background_image={background_image} />
            </div>
          ))}
        </div>
      )}

      {/* LOADING ICON AT THE BOTTOM */}
      {/* TODO - replace component with LoadMoreDeveloperGames once created */}
      {/* {params.slug && <LoadMoreGenreGames searchQuery={params.slug} />} */}
      {params.id && <LoadMoreGenreGames searchQuery={params.id} />}
    </div>
  );
};

export default DeveloperPage;
