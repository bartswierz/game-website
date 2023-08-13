"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { GamesSearch, GameSearchResults } from "@/types";
import { GameLink, Spinner } from "@/components/ui";
import { fetchNextSearchPage } from "@/utils";

interface LoadMoreSearchGamesProps {
  secondPage: string | null;
}

const LoadMoreSearchGames = ({ secondPage }: LoadMoreSearchGamesProps) => {
  // const [pagesLoaded, setPagesLoaded] = useState<number>(1);
  const [content, setContent] = useState<GameSearchResults[]>([]);
  // Setting to second page as a starting point, once the user reaches the bottom of the page, we will update the nextPage state with the next page API call
  const [nextPage, setNextPage] = useState<string | null>(secondPage);
  //Tracks window intersection to determine when to load more results(when user reaches the bottom of the page, load more)
  const { ref, inView, entry } = useInView();

  // IF USER REACHES THE END OF THE PAGE - LOAD MORE RESULTS
  useEffect(() => {
    if (inView) {
      loadMorePages();
    }
  }, [inView]);

  const loadMorePages = async () => {
    try {
      // If there is a next page, fetch the next page
      if (nextPage) {
        const fetchedData: GamesSearch = await fetchNextSearchPage(nextPage);

        // Add the new results to the existing content towards the bottom of the page
        setContent([...content, ...fetchedData.results]);

        // Update the next page state with a string or null, if it is not null that means we still have another page to load
        setNextPage(fetchedData.next);
        // console.log("fetchedContent.next: ", fetchedData.next);
      } else {
        console.log("No more pages to load");
        return;
      }

      // Updates the pages loaded state by 1
    } catch (error) {
      console.log("loadMorePages ERROR: ", error);
    }
  };

  if (!content) return <Spinner />;

  // if (!nextPage) return <div>No More Games!</div>;

  return (
    <div>
      {content && (
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-4 md:px-0 gap-1">
            {content.map(({ slug, name, background_image }) => (
              <li key={slug} className="h-64 p-2">
                <GameLink slug={slug} name={name} background_image={background_image} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Using 'ref' to trigger our useEffect for another API Call once the spinner is IN VIEW ON SCREEN*/}
      {nextPage ? (
        <div ref={ref} className="flex justify-center w-full mt-[3vh]">
          <Spinner />
        </div>
      ) : // REACHED THE END, NO MORE PAGES TO LOAD
      null}
    </div>
  );
};

export default LoadMoreSearchGames;
