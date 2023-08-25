"use client";
import { getGamesByGenre } from "@/utils";
import { ComboboxOrdering, ComboboxPlatforms, GameLink, LoadMoreGenreGames } from "@/components/ui";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GamesByGenre } from "@/types";
import Loading from "./loading";

//ex. http://localhost:3000/genres/sports?genres=sports
// const GenrePage = async ({ params }: { params: { slug: string } }) => {
const GenrePage = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const { slug } = params;
  // const content = await getGamesByGenre(params.slug);
  // const content = await getGamesByGenre(slug);
  const [content, setContent] = useState<GamesByGenre | null>(null);
  const searchGenres = searchParams.get("genres");
  // const [searchTerm, setSlugTerm] = useState<string | null>(slug);
  // Collects our value inside query passed from Combobox
  const searchOrdering = searchParams.get("ordering");
  const searchPlatforms = searchParams.get("platforms");
  const [platforms, setPlatforms] = useState<string | null>(searchPlatforms);
  const [ordering, setOrdering] = useState<string | null>(searchOrdering);
  const [searchSlug, setSearchSlug] = useState<string | null>(searchGenres);

  console.log("platforms: ", platforms, "& ordering: ", ordering, "& searchGenres: ", searchSlug);
  //UPDATING ORDERING STATE FROM COMBOBOX, WE WILL PASS IT TO THE COMBOBOX TO BE READY FOR THE NEXT FILTER SEARCH
  useEffect(() => {
    setOrdering(searchOrdering);
  }, [searchOrdering]);

  //UPDATING PLATFORMS STATE FROM COMBOBOX, WE WILL PASS IT TO THE COMBOBOX TO BE READY FOR THE NEXT FILTER SEARCH
  useEffect(() => {
    // User selected a platform, we will update the state so it can be passed to the combobox
    setPlatforms(searchPlatforms);
  }, [searchPlatforms]);

  useEffect(() => {
    // User selected a platform, we will update the state so it can be passed to the combobox
    setSearchSlug(searchGenres);
  }, [searchGenres]);

  useEffect(() => {
    // const fetchData = async (slug: string) => {
    const fetchData = async (searchGenres: string, searchOrdering?: string, searchPlatforms?: string) => {
      // value can be null or undefined if user only types in the search box
      // const data: GamesByGenre = await getGamesByGenre(searchGenres, searchOrdering, searchPlatforms);
      //TODO - pass in ordering and platforms as extra params
      const data: GamesByGenre = await getGamesByGenre(searchGenres, searchOrdering, searchPlatforms);

      if (data) {
        setContent(data);
      } else throw new Error("No data returned from getGamesSearch");
    };

    if (searchGenres) {
      if (searchOrdering && searchPlatforms) fetchData(searchGenres, searchOrdering, searchPlatforms);
      else if (searchOrdering && !searchPlatforms) fetchData(searchGenres, searchOrdering);
      else if (!searchOrdering && searchPlatforms) fetchData(searchGenres, searchPlatforms);
      else fetchData(searchGenres);
    }
    // fetchData(slug);
    // }, [slug, searchOrdering, searchPlatforms]);
  }, [searchGenres, searchOrdering, searchPlatforms]);
  // useEffect(() => {
  //   // const fetchData = async (slug: string) => {
  //   const fetchData = async (slug: string, searchOrdering?: string, searchPlatforms?: string) => {
  //     // value can be null or undefined if user only types in the search box
  //     // const data: GamesByGenre = await getGamesByGenre(slug, searchOrdering, searchPlatforms);
  //     //TODO - pass in ordering and platforms as extra params
  //     const data: GamesByGenre = await getGamesByGenre(slug, searchOrdering, searchPlatforms);

  //     if (data) {
  //       setContent(data);
  //     } else throw new Error("No data returned from getGamesSearch");
  //   };

  //   if (slug) {
  //     if (searchOrdering && searchPlatforms) fetchData(slug, searchOrdering, searchPlatforms);
  //     else if (searchOrdering && !searchPlatforms) fetchData(slug, searchOrdering);
  //     else if (!searchOrdering && searchPlatforms) fetchData(slug, searchPlatforms);
  //     else fetchData(slug);
  //   }
  //   // fetchData(slug);
  // }, [slug, searchOrdering, searchPlatforms]);

  if (!content) return <Loading />;

  return (
    <div className="text-white mx-4 xsm:mx-0">
      <div className="text-4xl font-semibold uppercase flex flex-wrap mb-8">
        {slug} GAMES
        <span className="text-base text-gray-500 ml-2 items-end self-end justify-end">{content.count}+ Games</span>
      </div>

      {/* TODO ~5AM 8/24 - PASS THE GENRES AS A PARAMETER INTO THE COMBOBOXS SO THAT WE CAN GET THE SEARCH BECAUSE AT THE MOMENT, AFTER WE SEARCH A FILTER, OUR searchGenres will come back null, BUT UPON OPENING THE FIRST TIME IT WILL BE CORRECT. ONCE WE PASS THE GENRE IT SHOULD ALL WORK - PASS GENRE AS A PROP THEN PASS THIS WITHIN THE QUERY */}
      {/* http://localhost:3000/genres/action?genres=action */}
      <div className="flex justify-center items-center md:justify-start md:items-start gap-4 my-4">
        {platforms ? (
          <ComboboxOrdering path={`/genres/${slug}`} platforms={platforms} genres={slug} page="genre" />
        ) : (
          <ComboboxOrdering path={`/genres/${slug}`} genres={slug} page="genre" />
        )}
        <ComboboxPlatforms path={`/genres/${slug}`} ordering={ordering} genres={slug} page="genre" />
      </div>
      {/* <div className="flex justify-center items-center md:justify-start md:items-start gap-4 my-4">
        {platforms ? (
          <ComboboxOrdering path={`/genres/${slug}?genres=${slug}`} platforms={platforms} genres={slug} page="genre" />
        ) : (
          <ComboboxOrdering path={`/genres/${slug}?genres=${slug}`} genres={slug} page="genre" />
        )}
        <ComboboxPlatforms path={`/genres/${slug}?genres=${slug}`} ordering={ordering} genres={slug} page="genre" />
      </div> */}
      {/* <div className="flex justify-center items-center md:justify-start md:items-start gap-4 my-4">
        {platforms ? (
          <ComboboxOrdering path={`/genres/${slug}?genres=${slug}`} platforms={platforms} />
        ) : (
          <ComboboxOrdering path={`/genres/${slug}?genres=${slug}`} />
        )}
        <ComboboxPlatforms path={`/genres/${slug}?genres=${slug}`} ordering={ordering} />
      </div> */}
      {/* <div className="flex justify-center items-center md:justify-start md:items-start gap-4 my-4">
        {platforms ? (
          <ComboboxOrdering path={`/genres/${slug}`} platforms={platforms} />
        ) : (
          <ComboboxOrdering path={`/genres/${slug}`} />
        )}
        <ComboboxPlatforms path={`/genres/${slug}`} ordering={ordering} />
      </div> */}

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
      {params.slug && <LoadMoreGenreGames searchQuery={params.slug} />}
    </div>
  );
};

export default GenrePage;
