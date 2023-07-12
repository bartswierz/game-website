"use client";
import { getGameDevelopers, getNextGameDevelopersPage, getPage } from "@/utils";
import React, { useState, useEffect } from "react";
import { NavigationButton } from "@/components/ui";
import Image from "next/image";
import { GameDevelopers, GameDevelopersResults } from "@/types";
// import { useRouter } from "next/navigation";
import Link from "next/link";

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

  // const handleDeveloperInfo = (developerInfo: GameDevelopersResults) => {
  //   console.log("Developer ID: ", developerInfo);

  //   // TODO - add useRouter here
  //   router.push(`/developer/${developerInfo.id}`);
  // };

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

      {/* TODO - Add useRouter -> id grabber to link to /developer/id */}
      <div className="flex flex-row flex-wrap gap-4">
        {content.results.map((dev) => {
          return (
            // <Link href={`developer/${dev.id}`} className="border bg-gray-500 w-64 h-max rounded-md shadow-lg" key={dev.id}>

            // <Link href={`developers/${dev.id}`} className="border bg-gray-500 w-64 h-max rounded-md shadow-lg" key={dev.id}>

            <Link
              href={{
                pathname: `developers/${dev.id}`,
              }}
              className="border bg-gray-500 w-64 h-max rounded-md shadow-lg"
              key={dev.id}
            >
              {/* <Link
              href={{
                pathname: `developers/${dev.id}`,
                query: { dev: dev.id },
              }}
              className="border bg-gray-500 w-64 h-max rounded-md shadow-lg"
              key={dev.id}
            > */}
              <div className="object-contain">
                <Image
                  src={dev.image_background}
                  alt="Game Developer"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain rounded-t-md"
                />
              </div>
              <ul className="p-2">
                {/* <li>Slug: {dev.slug}</li> */}
                <li className="text-xl">Dev: {dev.name}</li>
                <li>Id: {dev.id}</li>
                <li>Games Count: {dev.games_count}</li>
              </ul>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Developers;