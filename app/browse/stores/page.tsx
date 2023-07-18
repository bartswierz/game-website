import React from "react";
import { getStores } from "@/utils";
import { GameStores } from "@/types";
import Link from "next/link";
import { FaSteam, FaXbox, FaPlaystation, FaGooglePlay, FaApple } from "react-icons/fa";
import { SiNintendo, SiEpicgames, SiItchdotio, SiGogdotcom } from "react-icons/si";

const Stores = async () => {
  const storesList: GameStores = await getStores();
  // console.log("storesList: ", storesList);

  // Company Icon List for Stores
  const iconList = [
    <FaSteam size={50} />,
    <FaXbox size={50} />,
    <FaPlaystation size={50} />,
    <FaApple size={50} />,
    <SiGogdotcom size={50} />,
    <SiNintendo size={50} />,
    <FaXbox size={50} />,
    <FaGooglePlay size={50} />,
    <SiItchdotio size={50} />,
    <SiEpicgames size={50} />,
  ];

  if (!storesList) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex flex-wrap gap-4 text-white">
      {storesList.results.map((store, idx) => (
        <div className="flex flex-row items-center gap-x-4 border rounded-lg w-80 p-2">
          {/* COMPANY ICON */}
          <p>{iconList[idx]}</p>

          {/* TEXT CONTAINER */}
          <div className="flex-grow">
            <p className="text-xl font-semibold">
              {store.name} - ID: {store.id}
            </p>
            <Link href={`https://${store.domain}`} className="underline hover:text-blue-500" target="_blank">
              Go to {store.name}
            </Link>
            <p>
              <span className="font-semibold">{store.games_count}+</span> games available!
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stores;
