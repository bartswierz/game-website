"use client";
import { getGamesByGenre } from "@/utils";
import { ComboboxOrdering, ComboboxPlatforms, GameLink, LoadMoreGenreGames } from "@/components/ui";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GamesByGenre, ParameterObj } from "@/types";
import Loading from "./loading";
import { PageHeader } from "@/components/ui";
//ex. http://localhost:3000/genres/sports?genres=sports
// const GenrePage = async ({ params }: { params: { slug: string } }) => {
const GenrePage = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const { slug } = params;
  // const content = await getGamesByGenre(params.slug);
  // const content = await getGamesByGenre(slug);
  //TODO - Change to GamesByDeveloper - Need to create this first
  const [content, setContent] = useState<GamesByGenre | null>(null);
  const searchGenres = searchParams.get("genres");
  // const [searchTerm, setSlugTerm] = useState<string | null>(slug);
  // Collects our value inside query passed from Combobox
  const searchOrdering = searchParams.get("ordering");
  const searchPlatforms = searchParams.get("platforms");
  const [platforms, setPlatforms] = useState<string | null>(searchPlatforms);
  const [ordering, setOrdering] = useState<string | null>(searchOrdering);
  const [searchSlug, setSearchSlug] = useState<string | null>(searchGenres);

  //UPDATING ORDERING STATE FROM COMBOBOX, WE WILL PASS IT TO THE COMBOBOX TO BE READY FOR THE NEXT FILTER SEARCH
  useEffect(() => {
    setOrdering(searchOrdering);
  }, [searchOrdering]);

  //UPDATING PLATFORMS STATE FROM COMBOBOX, WE WILL PASS IT TO THE COMBOBOX TO BE READY FOR THE NEXT FILTER SEARCH
  useEffect(() => {
    // User selected a platform, we will update the state so it can be passed to the combobox
    setPlatforms(searchPlatforms);
  }, [searchPlatforms]);

  //TODO - change to searchDevelopers - this may be the ID or SLUG - i.e. ID:1612 OR valve-software is a valid search parameter
  useEffect(() => {
    // User selected a platform, we will update the state so it can be passed to the combobox
    setSearchSlug(searchGenres);
  }, [searchGenres]);

  useEffect(() => {
    // const fetchData = async (slug: string) => {
    // const fetchData = async (searchGenres: string, searchOrdering?: string, searchPlatforms?: string) => {
    // const fetchData = async ({searchGenres: searchGenres, searchOrdering?: searchOrdering, searchPlatforms?: searchPlatforms}) => {
    const fetchData = async (searchGenres: string | number, searchOrdering: string | null, searchPlatforms: string | null) => {
      // value can be null or undefined if user only types in the search box
      const data: GamesByGenre = await getGamesByGenre(searchGenres, searchOrdering, searchPlatforms);

      if (data) {
        setContent(data);
      } else throw new Error("No data returned from getGamesSearch");
    };

    if (searchGenres) fetchData(searchGenres, searchOrdering, searchPlatforms);
  }, [searchGenres, searchOrdering, searchPlatforms]);

  if (!content) return <Loading />;

  return (
    <div className="text-white mx-4 xsm:mx-0">
      <PageHeader title={`${slug} Games`} count={content.count} countType="Games" />

      {/* http://localhost:3000/genres/action?genres=action */}
      <div className="flex justify-center items-center md:justify-start md:items-start gap-4 my-4">
        {platforms ? (
          <ComboboxOrdering path={`/dashboard/genres/${slug}`} platforms={platforms} genres={slug} page="genre" />
        ) : (
          <ComboboxOrdering path={`/dashboard/genres/${slug}`} genres={slug} page="genre" />
        )}
        <ComboboxPlatforms path={`/dashboard/genres/${slug}`} ordering={ordering} genres={slug} page="genre" />
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
      {params.slug && <LoadMoreGenreGames searchQuery={params.slug} />}
    </div>
  );
};

export default GenrePage;
