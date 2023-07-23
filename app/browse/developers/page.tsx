"use client";
import { getGameDevelopers, getNextGameDevelopersPage, getPage } from "@/utils";
import React, { useState, useEffect } from "react";
import { GameLink, NavigationButton } from "@/components/ui";
import Image from "next/image";
import { GameDevelopers, GameDevelopersResults } from "@/types";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const Developers = () => {
  // const router = useRouter();
  const [content, setContent] = useState<GameDevelopers | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Ran once on page load
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from API...");
      const developers = await getGameDevelopers();
      setContent(developers);
    };

    fetchData();
  }, []);

  // Updates current page number whenever we get a new set of data from API
  useEffect(() => {
    // If content.next exists, get the page number from it
    if (content?.next) {
      const pageNumber = getPage(content.next);
      setCurrentPage(pageNumber);
    }
  }, [content]);

  // Handle page change
  const handlePageChange = async (request: string | null, pageDirection: string) => {
    console.log(`Fetching data for ${pageDirection} page...`);
    if (pageDirection === "prev") {
      if (content?.previous) {
        // console.log("content.prev: ", content.previous);
        const newContent = await getNextGameDevelopersPage(request);
        setContent(newContent);
      }
    } else if (pageDirection === "next") {
      if (content?.next) {
        // console.log("content.next: ", content.next);
        const newContent = await getNextGameDevelopersPage(request);
        setContent(newContent);
      }
    }
  };

  // While loading data from API
  if (!content) return <div className="text-white text-3xl">Loading...</div>;

  // Once data is ready to display
  return (
    <div className="text-white">
      <div>GAME DEVELOPERS INFORMATION</div>
      <div># of Developers: {content.count}</div>
      <div># of Pages: {Math.ceil(content.count / 10)}</div>
      <div>next: {content.next}</div>
      <div>previous: {content.previous}</div>

      <div className="my-5">
        {/* PREVIOUS BUTTON */}
        {content.previous ? (
          <NavigationButton
            text="Prev"
            request={content.previous}
            onPageChange={handlePageChange}
            pageDirection={"prev"}
            active={`${content.previous === null ? "inactive" : "active"}`}
          />
        ) : (
          <NavigationButton
            text="Prev"
            request={null}
            onPageChange={handlePageChange}
            pageDirection={"prev"}
            active={`${content.previous === null ? "inactive" : "active"}`}
          />
        )}

        {/* Page Counter */}
        <div className="inline-block px-4 py-2 m-1">
          Page {currentPage} of {Math.ceil(content.count / 10)}
        </div>

        {/* NEXT BUTTON */}
        <NavigationButton
          text="Next"
          request={content.next}
          onPageChange={handlePageChange}
          pageDirection={"next"}
          active={`${content.next === null ? "inactive" : "active"}`}
        />
      </div>

      <div className="flex flex-row flex-wrap gap-y-10">
        {/* {content.results.map(({ id, name, slug, image_background }: GameDevelopersResults) => { */}
        {content.results.map(({ id, name, slug, games_count, image_background, games }: GameDevelopersResults) => {
          return (
            <div key={id}>
              <h2 className="mb-6">
                <span className="text-3xl font-bold">{name}</span> <span className="text-gray-500 pl-1">{games_count}+ Games</span>
              </h2>

              <div className="flex flex-row flex-wrap gap-4 mb-4">
                {games.map(({ id, slug, name }) => (
                  <Link href={`/games/${slug}`} key={slug} className="relative flex flex-col shadow-xl w-56 h-64 group cursor-pointer">
                    <div className="text-center pt-6">
                      <p className="text-xl text-bold">{name}</p>
                      <p>id: {id}</p>
                    </div>

                    {/* GRADIENT BACKGROUND EFFECT */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                    {/* GAME NAME TEXT */}
                    <p className="absolute flex  justify-center items-center text-white  bottom-5 w-full text-center ">
                      <BsFillArrowRightCircleFill size={40} color="gray" className="group-hover:fill-white" />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Developers;
