"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { fetchNextPagePlatforms } from "@/utils";
import { GamePlatformResults, GamePlatforms } from "@/types";
import { Spinner } from "@/components/ui";
import GameLinkBasic from "../GameLinkBasic";

// Button that will render another page of results to the screen when clicked once the user reaches the bottom of the page
const LoadMorePlatforms = () => {
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);
  const [content, setContent] = useState<GamePlatformResults[]>([]);

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
      const fetchedContent: GamePlatforms = await fetchNextPagePlatforms(nextPage);
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
      <div className="mt-6">
        {/* <div className="flex flex-wrap gap-4"> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {content.map(({ id, name, games_count, games }) => (
            <div key={name}>
              <GameLinkBasic id={id} name={name} games_count={games_count} games={games} page="platforms" />
            </div>
          ))}
        </div>

        {/* Using 'ref' to trigger our useEffect for another API Call once the spinner is in view */}
        <div ref={ref} className="flex justify-center w-full mt-[3vh]">
          <Spinner />
        </div>
      </div>
    </>
  );
};

export default LoadMorePlatforms;
