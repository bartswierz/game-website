"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { fetchNextPageGenreGames } from "@/utils";
import Image from "next/image";
import { GamesByGenreResults, GamesByGenre } from "@/types";
import { GameLink, Spinner } from "@/components/ui";
import Link from "next/link";
import { getPlatformIcon, getPlatformStoreLink } from "@/app/platforms/[id]/page";

interface LoadMoreGenreProps {
  searchQuery: string;
}
// Button that will render another page of results to the screen when clicked once the user reaches the bottom of the page
const LoadMoreGenreGames = ({ searchQuery }: LoadMoreGenreProps) => {
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);
  const [content, setContent] = useState<GamesByGenreResults[]>([]);

  //Tracks window intersection to determine when to load more results(when user reaches the bottom of the page, load more)
  const { ref, inView, entry } = useInView();

  // IF USER REACHES THE END OF THE PAGE - LOAD MORE RESULTS
  useEffect(() => {
    if (inView) {
      loadMorePages();
    }
  }, [inView]);

  //Each page contains 10-12 games, depending on our page_size parameter passed in the call which can be adjusted. Current page size is 12
  const loadMorePages = async () => {
    const nextPage = pagesLoaded + 1;

    try {
      const fetchedContent: GamesByGenre = await fetchNextPageGenreGames(nextPage, searchQuery);
      const { results } = fetchedContent;

      // Add the new results to the existing content towards the bottom of the page
      setContent([...content, ...results]);

      // Updates the pages loaded state by 1
      setPagesLoaded((nextPage) => nextPage + 1);
    } catch (error) {
      console.log("loadMorePages ERROR: ", error);
    }
  };

  if (!content) return <Spinner />;

  return (
    <>
      <div className="mt-4">
        {content && (
          <div className="grid grid-cols-1 px-2 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4">
            {content.map(({ slug, name, background_image }) => (
              // Creates a Game Display for each game in the list as a link to the game page
              <div key={slug} className="h-64">
                <GameLink slug={slug} name={name} background_image={background_image} />
              </div>
            ))}
          </div>
        )}

        {/* Using 'ref' to trigger our useEffect for another API Call once the spinner is in view */}
        <div ref={ref} className="flex justify-center w-full">
          <Spinner />
        </div>
      </div>
    </>
  );
};

export default LoadMoreGenreGames;
