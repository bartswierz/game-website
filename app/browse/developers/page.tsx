"use client";
import { getGameDevelopers, getNextGameDevelopersPage } from "@/utils";
import React, { useState, useEffect } from "react";
import { NavigationButton } from "@/components/ui";
import Image from "next/image";
import { GameDevelopers } from "@/types";

const Developers = async () => {
  const [content, setContent] = useState<GameDevelopers | null>(null);

  // Ran once on page load
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from API...");
      const developers = await getGameDevelopers();
      const { results, next, previous } = developers;
      setContent(developers);
    };

    fetchData();
  }, []);

  // Handle page change
  const handlePageChange = async (request: string, pageDirection: string) => {
    console.log(`Fetching data for ${pageDirection} page...`);
    if (pageDirection === "prev") {
      if (content?.previous) {
        console.log("content.next: ", content.previous);
        const newContent = await getNextGameDevelopersPage(request);
        setContent(newContent);
      }
    } else if (pageDirection === "next") {
      if (content?.next) {
        console.log("content.next: ", content.next);
        const newContent = await getNextGameDevelopersPage(request);
        setContent(newContent);
      }
    }
  };

  // While loading data from API
  if (!content) return <div className="text-white text-3xl">Loading...</div>;

  // console.log("content", content);
  // Once data is ready to display
  return (
    <div className="text-white">
      <div>GAME DEVELOPERS INFORMATION</div>
      <div>count: {content.count}</div>
      <div>next: {content.next}</div>
      <div>previous: {content.previous}</div>

      {content.previous ? (
        <NavigationButton text="Prev" request={content.previous} onPageChange={handlePageChange} pageDirection={"prev"} />
      ) : null}

      <NavigationButton text="Next" request={content.next} onPageChange={handlePageChange} pageDirection={"next"} />

      <div className="flex flex-col gap-y-4">
        {content.results.map((dev, idx: number) => {
          return (
            <div className="border bg-gray-500" key={idx}>
              <div>Slug: {dev.slug}</div>
              <div>Id: {dev.id}</div>
              <div>Developer Name: {dev.name}</div>
              <div>Games Count: {dev.games_count}</div>
              <Image src={dev.image_background} alt="Game Developer" width={300} height={300} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Developers;
