"use client";
import { getGameDevelopers, getNextGameDevelopersPage } from "@/utils";
import React, { useState } from "react";
import { NavigationButton } from "@/components/ui";
import Image from "next/image";
import { GameDevelopers } from "@/types";

const Developers = async () => {
  const developers = await getGameDevelopers();
  const { results, next, previous } = developers;
  // const [content, setContent] = useState<GameDevelopers>(developers);

  console.log(developers);
  // console.log("content", content);
  return (
    <div className="text-white">
      <div>GAME DEVELOPERS INFORMATION</div>
      <div>count: {developers.count}</div>
      <div>next: {next}</div>
      <div>previous: {previous}</div>
      <div className="flex flex-col gap-y-4">
        {results.map((dev) => {
          return (
            <div className="border bg-gray-500">
              <div>Slug: {dev.slug}</div>
              <div>Id: {dev.id}</div>
              <div>Developer Name: {dev.name}</div>
              <div>Games Count: {dev.games_count}</div>
              <Image src={dev.image_background} alt="Game Developer" width={100} height={100} />
            </div>
          );
        })}
      </div>

      {previous ? <NavigationButton text="Prev" request={previous} onClick={() => getNextGameDevelopersPage(previous)} /> : null}
      <NavigationButton text="Next" request={next} onClick={() => getNextGameDevelopersPage(next)} />
    </div>
  );
};

export default Developers;

// const Developers = async () => {
//   const developers = await getGameDevelopers();
//   const { results, next, previous } = developers;
//   const [content, setContent] = useState<GameDevelopers>(developers);

//   console.log(developers);
//   return (
//     <div className="text-white">
//       <div>GAME DEVELOPERS INFORMATION</div>
//       <div>count: {developers.count}</div>
//       <div>next: {next}</div>
//       <div>previous: {previous}</div>
//       <div className="flex flex-col gap-y-4">
//         {results.map((dev) => {
//           return (
//             <div className="border bg-gray-500">
//               <div>Slug: {dev.slug}</div>
//               <div>Id: {dev.id}</div>
//               <div>Developer Name: {dev.name}</div>
//               <div>Games Count: {dev.games_count}</div>
//               <Image src={dev.image_background} alt="Game Developer" width={100} height={100} />
//             </div>
//           );
//         })}
//       </div>

//       {previous ? <NavigationButton text="Prev" request={previous} onClick={() => getNextGameDevelopersPage(previous)} /> : null}
//       <NavigationButton text="Next" request={developers.next} onClick={() => getNextGameDevelopersPage(next)} />
//     </div>
//   );
// };
